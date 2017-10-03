import * as $ from "jquery";

export enum httpRequestTypes {
    GET = 1,
    POST
}

export class Utils {
    
    public executeWebApi(ajaxURL: string, ajaxType: httpRequestTypes, ajaxData: string, token: string, header: any): any {
        var deferred = $.Deferred();
        header = header || {};
        var geo = header.geo || "";
        var tenantProductId = header.tenantProductId || "";
        $.ajax({
            type: httpRequestTypes[ajaxType],
            url: ajaxURL,
            data: ajaxData,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            contentType: "application/json; charset=utf-8",
            headers: {
                "Authorization": "Bearer " + token,
                "TenantProductId": tenantProductId,
                "Geo": geo
            }
        }).done(function (data) {
            deferred.resolve(data);
        }).fail(function (xhr) {
            deferred.reject(xhr);
            });

        return deferred.promise();
    }
}