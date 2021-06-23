import React, { Fragment, useState } from "react";
import ProductCard from "./ProductCard";
import {
  Container,
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const List = (props) => {
  const prodList = props.products;
  const count = props.count;
  const page = parseInt(props.page);

  const maxPages = Math.ceil(count / 9);
  let nextPage = page + 1;
  let previousPage = page - 1;
  const firstPage = 1;
  const lastPage = maxPages;
  const pageNumbers = [];

  console.log(nextPage);
  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
    console.log(pageNumbers[i], "p");
  }
  console.log(page, "krr");
  const renderPage = pageNumbers.map((number) => {
    return (
      <li key={number} id={number}>
        {number}
      </li>
    );
  });

  console.log(renderPage, "p");
  const prodsInRowNumber = 3;

  const prodGroups = [];
  let j;

  for (let i in prodList) {
    if (i % prodsInRowNumber === 0) {
      j = 0;
      prodGroups.push(Array.from(Array(prodsInRowNumber)));
    }

    prodGroups[prodGroups.length - 1][j++] = prodList[i];
  }

  return (
    <Fragment>
      <Container>
        <Row>
          {prodGroups.map((group, i) => (
            <Row key={i}>
              {group.map((item, i) =>
                item !== undefined ? (
                  <Col key={i}>
                    <ProductCard
                      id={item.id}
                      title={item.title}
                      img={item.img}
                      description={item.description}
                      price={item.price}
                    />
                  </Col>
                ) : (
                  <Col key={i}></Col>
                )
              )}
            </Row>
          ))}
        </Row>
        <Row
          style={{
            marginLeft: "50%",
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            color: "#011a00",
          }}
        >
          <Pagination size="sm" aria-label="Page navigation example">
            {maxPages <= 1 ? (
              <PaginationItem>
                {page}
                <PaginationLink href={"?page=" + page} />
              </PaginationItem>
            ) : (
              renderMultiPagination(page, maxPages)
            )}
          </Pagination>
        </Row>
      </Container>
    </Fragment>
  );
};
export default List;

const renderMultiPagination = (page, maxPages) => {
  return (
    <Fragment>
      <Pagination size="sm" aria-label="Page navigation example">
        {f1(maxPages, page)}
        {f2(maxPages, page)}
        {f3(maxPages, page)}
      </Pagination>
    </Fragment>
  );
};

const f1 = (maxPages, page) => {
  if (page === maxPages && page === 1) {
    return <a>{""}</a>;
  } else if (page > 1) {
    return (
      <Fragment>
        <PaginationItem>
        <PaginationLink first href={"?page=" + 1} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink previous href={"?page=" + (page - 1)} />
      </PaginationItem>
        
       
      </Fragment>
    );
  }
};
const f2 = (maxPages, page) => {
  debugger;
  if (maxPages === 2) {
    return (
      <Fragment>
          <PaginationItem>
        <b><PaginationLink href={"?page=" + page}>
        {page}
        </PaginationLink></b>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href={"?page=" + (page + 1)}>
        {page + 1}
        </PaginationLink>
      </PaginationItem>
      
       
        
      </Fragment>
    );
  } else if (maxPages >= 2 && page === 1) {
    return (
      <Fragment>
          <PaginationItem>
        <b><PaginationLink  href={"?page=" + page}>
          {page}
        </PaginationLink></b>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href={"?page=" + (page + 1)}>
          {page+1}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href={"?page=" + (page + 2)}>
          {page+2}
        </PaginationLink>
      </PaginationItem>
       
      </Fragment>
    );
  } else if (maxPages >= 2 && page >= 2 && maxPages !== page) {
    return (
      <Fragment>
          <PaginationItem>
        <PaginationLink href={"?page=" + (page - 1)}>
          {page-1}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <b><PaginationLink  href={"?page=" + page}>
          {page}
        </PaginationLink></b>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href={"?page=" + (page + 1)}>
          {page+1}
        </PaginationLink>
      </PaginationItem>
        
      </Fragment>
    );
  } else if (maxPages >= 2 && page >= 2 && maxPages == page) {
    return (
      <Fragment>
          <PaginationItem>
        <PaginationLink href={"?page=" + (page - 2)}>
          {page-2}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href={"?page=" + (page - 1)}>
          {page-1}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <b><PaginationLink style={{ maxWidth: "bold" }} href={"?page=" + page}>
          {page}
        </PaginationLink></b>
      </PaginationItem>
        
      </Fragment>
    );
  }
};
const f3 = (maxPages, page) => {
  if (page !== maxPages) {
    return (
      <Fragment>
         <PaginationItem>
        <PaginationLink next href={"?page=" + (page + 1)} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href={"?page=" + maxPages} />
      </PaginationItem>
        
      </Fragment>
    );
  } else {
    <a>{""}</a>;
  }
};
