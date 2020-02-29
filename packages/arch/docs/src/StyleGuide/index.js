/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'gatsby';
import { Match } from '@reach/router';

import { Container, FlexGroup } from '@k5ui/layout';
import { SecondaryNav, SecondaryNavItem } from '@k5ui/navbar';
import { H1 } from '@k5ui/typography';
import { Global } from '@emotion/core';
import { globalStyles } from '@k5ui/theme';

const pages = {
  '/': 'Components',
  palette: 'Palette',
  icons: 'Icons',
};

export default function StyleGuide(props) {
  return (
    <Match path="/:page">
      {({ match }) => {
        let currentPage = match === null ? '/' : match.page;
        return (
          <Container css={{ paddingBottom: 24 }}>
            <Global styles={globalStyles} />
            <SecondaryNav>
              <FlexGroup>
                {Object.keys(pages).map(page => (
                  <SecondaryNavItem
                    key={page}
                    as={Link}
                    isSelected={currentPage === page}
                    to={page}
                  >
                    {pages[page]}
                  </SecondaryNavItem>
                ))}
              </FlexGroup>
            </SecondaryNav>
            <H1>Style Guide: {pages[currentPage]}</H1>
            {props.children}
          </Container>
        );
      }}
    </Match>
  );
}
