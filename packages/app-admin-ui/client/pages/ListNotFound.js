import React from 'react';

import PageError from '../components/PageError';
import { Button } from '@k5ui/button';
import { IssueOpenedIcon } from '@k5ui/icons';

const ListNotFoundPage = ({ listKey, adminPath }) => (
  <PageError Icon={IssueOpenedIcon}>
    <p>
      The list &ldquo;
      {listKey}
      &rdquo; doesn&apos;t exist
    </p>
    <Button to={adminPath} variant="ghost">
      Go Home
    </Button>
  </PageError>
);

export default ListNotFoundPage;
