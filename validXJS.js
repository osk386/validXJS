/*!
 * ValidXJS 0.1
 *
 * Created by Oskar Arenas (osk386);
 * Licensed under the MIT license.
 */

// Properties

var globalProperties = {

    'errorMessageRegex': "Incorrect text pattern.",
    'errorMessageDate': "Wrong date value.",
    'errorMessageTime': "Wrong time value.",
    'errorMessageNumeric': "Non numeric value.",
    'errorMessageAlphaNumeric': "Non alphanumeric value.",
    'errorMessageAlpha': "Only letters admitted.",
    'errorMessageText': "Text error.",
    'errorMessageLengthMin': "Value size is shorter than specified.",
    'errorMessageLengthMax': "Value size is longer than specified.",
    'errorMessageDefinedValue': "Value not admitted.",
    'errorMessageAcceptNull': "Null value is not accepted.",
    'errorMessageLessThan': "Value can't be less than entered",
    'errorMessageGreaterThan': "Value can't be greater than entered"

};


/**
 * Set initial parameters from an ojject
 * @param objProperties Object with globalProperties
 */
function validXJS(objProperties) {
    if (objProperties != null) {
        for (var prop in objProperties.properties) {
            globalProperties[prop] = objProperties.properties[prop];
        }

    }
}

/**
 * Set initial parameters from a JSON string
 * @param strJASONProperties String with globalProperties in json format
 */
function validXJSON(strJASONProperties) {

    if (strJASONProperties != null) {
        var props = JSON.parse(strJASONProperties);
        for (var prop in props.properties) {
            globalProperties[prop] = props.properties[prop];
        }

    }
}


/**
 * Add validator to String type.
 * @param object with parameters to validate.
 * @returns {Array} List of errors.
 */
if (String.prototype.validate == null) String.prototype.validate = function () {

    var result = true;
    // Variable to store error messages in a list
    var errorList = [];
    // Set local properties
    var property = {};

    for (var err in globalProperties) {
        property[err] = globalProperties[err];
    }

    // Declaration variable accept decimal
    var dec = '';


    if (this != "" && this != null) {

        errorList = [];

        // Iterate over each validation type to
        for (var i in arguments) {
            var validation = arguments[i];


            switch (validation.type) {


                // For regular expression validation
                case "regex":

                    regex = new RegExp(validation.value);
                    if (!this.match(regex)) {
                        if (validation.msg != null) {
                            result = false;
                            errorList.push(validation.msg, this);
                        }
                        else {
                            result = false;
                            errorList.push(property.errorMessageRegex, this);
                        }

                    }

                    break;




                // For numeric validation
                case "numeric":

                    dec = validation.decimal ? '(\\.[0-9]{1,' + validation.decimal + '})?' : '';

                    regex = new RegExp('^[0-9' + validation.chars + ']*' + dec + '$');
                    if (!this.match(regex)) {

                        if (validation.msg != null) {
                            result = false;
                            errorList.push(validation.msg, this);
                        }
                        else {
                            result = false;
                            errorList.push(property.errorMessageNumeric, this);
                        }

                    }
                    break;


                // For alphanumeric validation
                case "alphanumeric":
                    regex = new RegExp('^[0-9a-zA-Z' + validation.chars + ']*$');
                    if (!this.match(regex)) {
                        if (validation.msg != null) {
                            result = false;
                            errorList.push(validation.msg, this);
                        }
                        else {
                            result = false;
                            errorList.push(property.errorMessageAlphaNumeric, this);
                        }


                    }
                    break;

                // For just letters validation
                case "alpha":

                    regex = new RegExp('^[a-zA-Z' + validation.chars + ']*$');
                    if (!this.match(regex)) {
                        if (validation.msg != null) {
                            result = false;

                            errorList.push(validation.msg, this);
                        }
                        else {
                            result = false;

                            errorList.push(property.errorMessageAlpha, this);
                        }


                    }
                    break;

                // For text validation
                case "text":
                    if (this.length < validation.lmin || this.length > validation.lmax) {
                        if (validation.msg != null) {
                            result = false;
                            errorList.push(validation.msg, this);
                        }
                        else {
                            result = false;
                            errorList.push(property.errorMessageText, this);
                        }

                    }
                    break;

                // For date validation
                // input string format of date
                case "date":

                    if (validation.format != null) {
                        var is_chrome = window.chrome;
                        var dayInMilisecs = 0;
                        var datePart = null;
                        var dateComp = null;
                        var dateFinal = null;
                        var valiDate = null;
                        var dateStr = null;
                        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var indexMonth = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

                        switch (validation.format) {

                            case "YYYY-MM-DD":
                            {
                                datePart = this.split('-');
                                dateStr = months[parseInt(datePart[1]) - 1] + ' ' + parseInt(datePart[2]) + ', ' + parseInt(datePart[0]);
                                dateComp = Date.parse(dateStr);
                                dateFinal = new Date(dateComp);
                                valiDate = dateFinal.getFullYear() + '-' + indexMonth[dateFinal.getMonth()] + '-' + (dateFinal.getDate().toString().length == 1 ? '0' + dateFinal.getDate() : dateFinal.getDate());
                            }
                                break;


                            case "YYYY/MM/DD":
                            {
                                datePart = this.split('/');
                                dateStr = months[parseInt(datePart[1]) - 1] + ' ' + parseInt(datePart[2]) + ', ' + parseInt(datePart[0]);
                                dateComp = Date.parse(dateStr);
                                dateFinal = new Date(dateComp);
                                valiDate = dateFinal.getFullYear() + '/' + indexMonth[dateFinal.getMonth()] + '/' + (dateFinal.getDate().toString().length == 1 ? '0' + dateFinal.getDate() : dateFinal.getDate());
                            }
                                break;


                            case "MM/DD/YYYY":
                            {
                                datePart = this.split('/');
                                dateStr = months[parseInt(datePart[0]) - 1] + ' ' + parseInt(datePart[1]) + ', ' + parseInt(datePart[2]);
                                dateComp = Date.parse(dateStr);
                                dateFinal = new Date(dateComp);
                                valiDate = indexMonth[dateFinal.getMonth()] + '/' +  (dateFinal.getDate().toString().length == 1 ? '0' + dateFinal.getDate() : dateFinal.getDate() + '/' + dateFinal.getFullYear());

                            }
                                break;


                            case "DD/MM/YYYY":
                            {
                                datePart = this.split('/');
                                dateStr = months[parseInt(datePart[1]) - 1] + ' ' + parseInt(datePart[0]) + ', ' + parseInt(datePart[2]);
                                dateComp = Date.parse(dateStr);
                                dateFinal = new Date(dateComp);
                                valiDate =  (dateFinal.getDate().toString().length == 1 ? '0' + dateFinal.getDate() : dateFinal.getDate()  + '/' +indexMonth[dateFinal.getMonth()] + '/' + dateFinal.getFullYear());
                            }
                                break;

                            case "YYYYMMDD":
                            {
                                var datePart1 = this.substr(0, 4);
                                var datePart2 = this.substr(4, 2);
                                var datePart3 = this.substr(6, 2);


                                dateStr = months[parseInt(datePart2) - 1] + ' ' + parseInt(datePart3) + ', ' + parseInt(datePart1);
                                dateComp = Date.parse(dateStr);
                                dateFinal = new Date(dateComp);
                                valiDate = dateFinal.getFullYear() + indexMonth[dateFinal.getMonth()] + (dateFinal.getDate().toString().length == 1 ? '0' + dateFinal.getDate() : dateFinal.getDate());


                            }
                                break;
                        }


                        if (this != valiDate) {

                            if (validation.msg != null) {
                                result = false;
                                errorList.push(validation.msg, this);
                            }
                            else {
                                result = false;
                                errorList.push(property.errorMessageDate, this);
                            }

                        }

                    }
                    break;

                // For defined values
                // input string or array of strings
                case "defined":

                    if ((typeof validation.value) === "object") {

                        var rightDefined = 0;
                        for (var i in validation.value) {
                            if (this == validation.value[i]) {
                                rightDefined++;
                            }
                        }

                        if (!rightDefined) {
                            result = false;
                            errorList.push(property.errorMessageDefinedValue, this);
                        }
                    }
                    else {
                        if (this != validation.value) {
                            result = false;
                            errorList.push(property.errorMessageDefinedValue, this);
                        }
                    }

                    break;
            }


            // Set once a global property
            for (var x in property) {
                if (validation[x]) {
                    property[x] = validation[x];
                }
            }

            // ****************  Global validations  ********************************************


            // Validate minimun length of string.
            if (validation.lmin && this.length < validation.lmin) {

                result = false;
                errorList.push(property.errorMessageLengthMin, this);
            }
            // Validate maximun length of string
            if (validation.lmax && this.length > validation.lmax) {

                result = false;
                errorList.push(property.errorMessageLengthMax, this);
            }


            // Validate that value cant be less than other
            if ((typeof validation.notlt) === "object") {
                for (var i in validation.notlt) {
                    if (this < validation.notlt[i]) {


                        result = false;
                        errorList.push(property.errorMessageLessThan, this);
                    }
                }

            } else {
                if (this < validation.notlt) {
                    result = false;
                    errorList.push(property.errorMessageLessThan, this);
                }
            }

            // Validate that value cant be greater than other
            if ((typeof validation.notgt) === "object") {
                for (var i in validation.notgt) {
                    if (this > validation.notgt[i]) {


                        result = false;
                        errorList.push(property.errorMessageGreaterThan, this);
                    }
                }

            } else {
                if (this > validation.notgt) {
                    result = false;
                    errorList.push(property.errorMessageGreaterThan, this);
                }
            }


        }

    }
    else {
        for (var i in arguments) {
            if (arguments[i].lmin > 0) {
                result = false;
                errorList.push(property.errorMessageAcceptNull, this);
            }
            else {

            }

        }


    }

    return [result, errorList];

};

