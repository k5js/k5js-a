---
'@keystonejs/app-admin-ui': patch
---

Fixed Select field filter when there are multiple values, generated GraphQL query did not include the `[]` in case of multi value filter.
Enabled selection of multiple options in Filter for Select type fields.
This also disables use of filter with empty values, you can not apply new filter if none of the options are selected. Can not deselect last filter item when adding or editing.
