///<reference path="../../../../typings/angularjs/angular.d.ts"/>

module Filters {
    export function matchMonthAndYear()
    {
        return function (items:  [any], month: number, year: number) {
            let result :any= [];
            for (let i = 0; i < items.length; i++) {
                if (items[i].month == month && items[i].year == year) {
                    result.push(items[i]);
                }
            }
            return result;

        };
    }

    export function dateRange(){
        return function (items:  [any], month: number, year: number) {
            let d = new Date();
            d.setFullYear(year, month - 1, 1);
            let df = d.setHours(0, 0);
            d.setFullYear(year, month, 0);
            let dt = d.setHours(23, 59);

            let result :any= [];
            for (let i = 0; i < items.length; i++) {
                let tf: any = new Date(items[i].date);
                if (tf >= df && tf <= dt) {
                    result.push(items[i]);
                }
            }

            return result;
        };
    }
}
(function () {
    'use strict';
    angular.module('app').filter("matchMonthAndYear", Filters.matchMonthAndYear);
    angular.module('app').filter("dateRange", Filters.dateRange);
})();
