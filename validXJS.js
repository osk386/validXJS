/*!
 * ValidXJS 0.1
 *
 * Created by Oskar Arenas (osk386);
 * Licensed under the MIT license.
 */

// Properties
var properties = {
    'errorMessageRegex': "Incorrect text pattern.",
    'errorMessageDate': "Wrong date value.",
    'errorMessageTime': "Wrong time value.",
    'errorMessageNumeric': "Non numeric value.",
    'errorMessageAlphaNumeric': "Non alphanumeric value.",
    'errorMessageText': "Text error."
};


/**
 * Set initial parameters from an ojject
 * @param objProperties Object with properties
 */
function validXJS(objProperties) {
    if (objProperties != null) {
        for (var prop in objProperties.properties) {
            properties[prop] = objProperties.properties[prop];
        }

    }
}

/**
 * Set initial parameters from a JSON string
 * @param strJASONProperties String with properties in json format
 */
function validXJSON(strJASONProperties) {

    if (strJASONProperties != null) {
        var props = JSON.parse(strJASONProperties);
        for (var prop in props.properties) {
            properties[prop] = props.properties[prop];
        }

    }
}

/**
 * Add validator to String type
 * @param object
 * @returns {Array} List of errors
 */
String.prototype.validate = function (object) {

    // Store error messages in a list
    var errorList = [];

    // Iterate over each validation type to
    for (var i in arguments) {
        var validation = arguments[i];
        var lmaxS = null;
        var lmin = null;
        var lmax = null;
        var dec = null;
        var regex = null;

        switch (validation.type) {
            // For regular expression validation
            case "regex":
                regex = new RegExp(validation.valor);
                if (!this.match(regex)) {
                    if (validation.msg != null)
                        errorList.push([validation.msg, this]);
                    else
                        errorList.push([properties.errorMessageRegex, this]);

                }

                break;


            // For numeric validation
            case "numeric":
                lmaxS = validation.longmax ? validation.longmax : '';
                lmin = validation.longmin != null ? validation.longmin : 1;
                lmax = validation.longmax ? validation.longmax : 30;
                dec = validation.decimal ? '(\\.[0-9]{1,' + validation.decimal + '})?' : '';
                regex = new RegExp('^[0-9]{' + lmin + ',' + lmax + '}' + dec + '$');
                if (!this.match(regex)) {
                    if (validation.msg != null)
                        errorList.push([validation.msg, this]);
                    else
                        errorList.push([properties.errorMessageNumeric, this]);

                }
                break;


            // For alphanumeric validation
            case "alphanumeric":
                lmaxS = validation.longmax ? validation.longmax : '';
                lmin = validation.longmin != null ? validation.longmin : 1;
                lmax = validation.longmax ? validation.longmax : 30;
                regex = new RegExp('^[0-9a-zA-Z]{' + lmin + ',' + lmax + '}' + dec + '$');
                if (!this.match(regex)) {
                    if (validation.msg != null)
                        errorList.push([validation.msg, this]);
                    else
                        errorList.push([properties.errorMessageAlphaNumeric, this]);


                }
                break;

            // For text validation
            case "text":
                lmaxS = validation.longmax ? validation.longmax : '';
                lmin = validation.longmin != null ? validation.longmin : 1;
                lmax = validation.longmax ? validation.longmax : 8000;

                if (this.length < lmin || this.length > lmax) {
                    if (validation.msg != null)
                        errorList.push([validation.msg, thisS]);
                    else
                        errorList.push([properties.errorMessageText, this]);

                }
                break;

            // For date validation
            case "date":

                if (validation.format != null) {
                    var is_chrome = window.chrome;
                    var dayInMilisecs = 0;
                    var datePart = null;
                    var dateComp = null;
                    var dateMsecs = null;
                    var altDate = null;
                    var valiDate = null;
                    var dateStr = null;
                    switch (validation.format) {

                        case "YYYY-MM-DD":
                        {
                            datePart = this.split('-');
                            dateComp = parseInt(datePart[0]) + "-" + parseInt(datePart[1]) + "-" + parseInt(datePart[2]);
                            if (is_chrome) {
                                dateStr = dateComp;
                            }
                            else {
                                dateStr = datePart[0] + "-" + datePart[1] + "-" + datePart[2];
                                dayInMilisecs = 86400000;
                            }
                        }
                            break;


                        case "YYYY/MM/DD":
                        {
                            datePart = this.split('/');
                            dateComp = parseInt(datePart[0]) + "-" + parseInt(datePart[1]) + "-" + parseInt(datePart[2]);
                            if (is_chrome) {
                                dateStr = dateComp;
                            }
                            else {
                                dateStr = datePart[0] + "-" + datePart[1] + "-" + datePart[2];
                                dayInMilisecs = 86400000;
                            }
                        }
                            break;


                        case "MM/DD/YYYY":
                        {
                            datePart = this.split('/');
                            dateComp = parseInt(datePart[2]) + "-" + parseInt(datePart[0]) + "-" + parseInt(datePart[1]);
                            if (is_chrome) {
                                dateStr = dateComp;
                            }
                            else {
                                dateStr = datePart[2] + "-" + datePart[0] + "-" + datePart[1];
                                dayInMilisecs = 86400000;
                            }
                        }
                            break;


                        case "DD/MM/YYYY":
                        {
                            datePart = this.split('/');
                            dateComp = parseInt(datePart[2]) + "-" + parseInt(datePart[1]) + "-" + parseInt(datePart[0]);
                            if (is_chrome) {
                                dateStr = dateComp;
                            }
                            else {
                                dateStr = datePart[2] + "-" + datePart[1] + "-" + datePart[0];
                                dayInMilisecs = 86400000;
                            }
                        }
                            break;
                    }

                    dateMsecs = Date.parse(dateStr) + dayInMilisecs;
                    altDate = new Date(dateMsecs);
                    valiDate = altDate.getFullYear() + "-" + (altDate.getMonth() + 1) + "-" + altDate.getDate();

                    if (dateComp != valiDate) {

                        if (validation.msg != null)
                            errorList.push([validation.msg, this]);
                        else
                            errorList.push([properties.errorMessageDate, this]);

                    }

                }
                break;
        }
    }
    return errorList;

};




