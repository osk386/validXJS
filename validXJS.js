/*!
 * ValidXJS 0.1
 *
 * Created by Oskar Arenas (osk386);
 * Licensed under the MIT license.
 */

// Properties
var properties = {
    'errorMessageRegex'         : "Incorrect text pattern.",
    'errorMessageDate'          : "Wrong date value.",
    'errorMessageTime'          : "Wrong time value.",
    'errorMessageNumeric'       : "Non numeric value.",
    'errorMessageAlphaNumeric'  : "Non alphanumeric value."
};


/**
 * Set initial parameters from an ojject
 * @param objProperties Object with properties
 */
function validXJS(objProperties){
    if(objProperties!=null){
        for (var prop in objProperties.properties){
            properties[prop]=objProperties.properties[prop];
        }

    }
}

/**
 * Set initial parameters from a JSON string
 * @param strJASONProperties String with properties in json format
 */
function validXJSON(strJASONProperties){

    if(strJASONProperties!=null){
        var props= JSON.parse(strJASONProperties);
        for (var prop in props.properties){
            properties[prop]=props.properties[prop];
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

        if (validation.type == "regex") {
            var regex = new RegExp(validation.valor);
            if (!this.match(regex)) {
                if (validation.msg != null)
                    errorList.push([validation.msg, this]);
                else
                    errorList.push([properties.errorMessageRegex, this]);

            }
        }
}
