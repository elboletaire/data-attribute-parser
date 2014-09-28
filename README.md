data-attribute-parser
=====================

jQuery helper plugin to parse `data-` attributes and load other plugins using that parsed attributes as plugin params.

How to use it?
--------------

Here's an example on how to load ckeditor (it's an example!) on textarea
inputs. Assuming you have some textareas like the following:

```html
<textarea data-ckeditor-disable>
    This textarea won't have CKEditor enabled
</textarea>
<textarea data-ckeditor-resize_enabled=true data-ckeditor-toolbar="toolbar-name">
    This textarea will have CKEditor enabled with the specified values
</textarea>
```
Now parse the params and load the plugin:

```javascript
$('textarea').parseDataAttributes({
        prefix: "ckeditor", // will search for data-ckeditor- prefixed attributes
        params: {
            // default params to be merged with data- params
            toolbar: "full",
            resize_enabled: false
        }
    }, function($this, params) {
        // Run a callback after params have been parsed
        $this.ckeditor(params);
    }
);
```
> WARNING: camelCasedValues are lowercased by the DOM, so you will need to
declare that attributes as dashed-attributes and they will be converted to
camel cased (i.e. `dashed-attributes` to `dashedAttributes`).
