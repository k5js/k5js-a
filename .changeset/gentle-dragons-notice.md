---
'@k5js/app-admin-ui': minor
'@k5js/fields': minor
---

Enabled use of Custom field views

#### How to use this

first create a react component based on existing field views (copy and modify them), just the one you need.
then create hooks config name `views` and add a key for this view.

```js
import  emailFieldView from '../fields/customEmailView';
module.exports = {
    pages: () => [];
    views: {
        customEmailField: emailFieldView,
        // ....
    }
}
```

add `views: {Field: 'string name of view', Cell: 'view name', Filter: 'view name' }` to field config like this

```js
// create field config.
    fields: {
        //... other fields
        email: { type: Text, isUnique: true, views: { Field: 'eustomEmailFiled' } },
        //... more fields.
    }
```
