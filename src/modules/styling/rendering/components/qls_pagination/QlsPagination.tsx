import * as React from 'react';
import Pagination from "reactstrap/lib/Pagination";
import PageNode from "../../../form/nodes/containers/PageNode";
import PaginationItem from "reactstrap/lib/PaginationItem";
import PaginationLink from "reactstrap/lib/PaginationLink";

export interface QlsPaginationProps {
  activePage?: PageNode;
  pages: PageNode[];
  onChangePage: (page: PageNode) => void;
}

export const QlsPagination: React.SFC<QlsPaginationProps> = (props) => {
  const onChangePage = (page: PageNode, clickEvent: React.MouseEvent<HTMLElement>) => {
    clickEvent.preventDefault();
    props.onChangePage(page);
  };

  const pageIsActive = (page: PageNode): boolean => {
    if (typeof props.activePage === 'undefined') {
      return false;
    }

    return props.activePage.isEqual(page);
  };

  const renderPaginationLinks = () => {
    return props.pages.map(page => {
      return (
          <PaginationItem active={pageIsActive(page)} key={page.name}>
            <PaginationLink onClick={event => onChangePage(page, event)} href="#">
              {page.name}
            </PaginationLink>
          </PaginationItem>
      );
    });
  };

  return (
      <Pagination>
        {renderPaginationLinks()}
      </Pagination>
  );
};