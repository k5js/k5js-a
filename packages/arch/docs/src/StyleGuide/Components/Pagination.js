import React, { Fragment } from 'react';
import { Pagination } from '@k5ui/pagination';

const PaginationGuide = () => (
  <Fragment>
    <h2>Pagination</h2>
    <Pagination total={256} />
  </Fragment>
);

export default PaginationGuide;
