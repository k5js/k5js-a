import React from 'react';

import { Container } from '@k5ui/layout';
import { Title } from '@k5ui/typography';

const Dashboard = () => (
  <Container>
    <Title as="h1" margin="both">
      Dashboard
    </Title>
    <p>This is a custom dashboard in the Blog demo project Admin UI.</p>
    <p>
      It demonstrates the ability to change the default dashboard and render a custom page instead.
    </p>
  </Container>
);

export default Dashboard;
