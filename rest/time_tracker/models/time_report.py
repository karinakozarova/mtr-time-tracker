from django.db import models
from django.db.models import Sum, Q
from django.core import exceptions
from django.utils.translation import ugettext as _
from django.utils import timezone

from time_tracker.models import Profile
from time_tracker.models import Project

import time


class TimeReportManager(models.Manager):
    use_for_related_fields = True

    def active_projects(self, user, **kwargs):
        active_filter = self.filter(is_active=True,
                                    profile__isnull=False,
                                    project__isnull=False,
                                    profile__is_active=True,
                                    project__is_active=True,
                                    **kwargs)
        if user.is_superuser is False:
            active_filter = self.filter(Q(profile__user=user) | Q(project__in=user.profile.project_set.all()))
        return active_filter

    def total_time_by(self, user, group_by, order_by, **kwargs):
        return (self.active_projects(user, **kwargs)
                .values(group_by)
                .annotate(total_seconds=Sum('seconds'))
                .order_by(order_by))


class TimeReport(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=254, unique=False, null=False, blank=False)
    profile = models.ForeignKey(Profile, verbose_name=_("Profile"), null=True, blank=False, on_delete=models.PROTECT)
    project = models.ForeignKey(Project, verbose_name=_("Project"), null=True, blank=False, on_delete=models.PROTECT)
    seconds = models.IntegerField(verbose_name=_("Seconds"), null=True, blank=False)
    date = models.DateField(verbose_name=_("Date"), default=timezone.now, null=True, blank=False)
    description = models.TextField(verbose_name=_("Description"), unique=False, null=True, blank=True)
    is_active = models.BooleanField(verbose_name=_("Is active"), default=True)

    created_at = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_("Updated at"), auto_now=True)

    objects = TimeReportManager()

    class Meta(object):
        verbose_name = _("time report")
        verbose_name_plural = _("time reports")

    def __str__(self):
        return self.name

    def clean_fields(self, exclude=None):
        super().clean_fields(exclude)
        errors = {}
        if self.seconds < 60:
            errors.setdefault('seconds', []).append(_("Duration must be greater than 1 minute."))
        if self.seconds > 86400:
            errors.setdefault('seconds', []).append(_("Duration must be lower than 24 hours."))
        if errors:
            raise exceptions.ValidationError(errors)

    @property
    def hours(self):
        """
        Convert time from seconds to hours
        """
        if self.seconds is None or self.seconds < 1:
            self.seconds = 0
        return time.strftime("%H:%M", time.gmtime(self.seconds))

    @staticmethod
    def sec_to_hours(seconds):
        if seconds is None or seconds <= 0:
            return "%d:%02d" % (0, 0)
        m, s = divmod(seconds, 60)
        h, m = divmod(m, 60)
        return "%d:%02d" % (h, m)
