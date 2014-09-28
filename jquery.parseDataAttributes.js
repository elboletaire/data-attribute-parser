/**
 * Plugin that converts data-params in elements to an
 * array of params to use it for loading plugins without
 * the need to add js to every view you have.
 *
 * @author    Òscar Casajuana <elboletaire@underave.net>
 * @license   Apache-2.0
 * @copyright Òscar Casajuana 2014
 * @version   0.1
 *
 * How to use it?
 * Here's an example on how to load ckeditor on textareas
 *
 * <textarea data-ckeditor-disable>
 *     This textarea won't have ckeditor enabled
 * </textarea>
 * <textarea data-ckeditor-resize_enabled=false data-ckeditor-toolbar="toolbar-name"></textarea>
 *
 * $('textarea').parseDataAttributes({
 *     prefix: "ckeditor", // will search for data-ckeditor- prefixed attributes
 *     params: {
 *         // default params to be merged with data- params
 *         toolbar: "full",
 *         resize_enabled: false
 *     }
 *  }, function($this, params) {
 *      // Run a callback after params have been parsed
 *      $this.ckeditor(params);
 *  });
 *
 * WARNING: camelCasedValues are lowercased by the DOM, so you will need to declare
 *          that attributes as dashed-attributes and they will be converted to
 *          camel cased (i.e. dashedAttributes).
 */
;(function($){
    // dashed-toCamelCase
    String.prototype.camelCase = function() {
        return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace(/-|_/, '');});
    };
    var DataAttrParser = function($this, options) {
        var defaults = {
            prefix : false,
            params : {}
        };

        options = $.extend(true, defaults, options);

        if (!options.prefix) {
            return;
        }

        options.prefix = 'data-' + options.prefix + '-';

        if ($this.attr(options.prefix + 'disable')) {
            return;
        }

        $($this[0].attributes).each(function() {
            // Set any param found in data- attributes
            var prefix_regex = new RegExp('^' + options.prefix);
            if (this.nodeName.match(prefix_regex)) {
                var param = this.nodeName.replace(prefix_regex, ''),
                    value = this.value;

                // Due to DOM limitations we need to set CamelCased vars as dashed-vars and they're replaced here
                if (param.match(/(\-[a-z])/g)) {
                    param = param.camelCase();
                }
                if (!isNaN(value)) {
                    value = parseInt(value, 10);
                }
                options.params[param] = value;
            }
        });

        if (typeof options.callback === 'function') {
            options.callback($this, options.params);
        }
    };

    $.fn.parseDataAttributes = function(options, callback) {
        return this.each(function() {
            if (typeof callback === 'function') {
                options.callback = callback;
            }
            return new DataAttrParser($(this), options);
        });
    };
})(jQuery);
