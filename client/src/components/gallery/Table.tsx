import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
import NextLink from "next/link";

// Material-ui stuff
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';
import * as table from "./skeleton";
import { colors } from "styles/theme";

// interface Props {}

export default function fun(props) {
  React.useEffect(() => {
    console.log(table.posts.map((el) => el));
  });

  return (
    <Table>
      <thead>
        <tr>
          {Object.entries(table.head).map((el) => {
            return (
              <th key={el[0]} className={el[0]}>
                {el[1]}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {table.posts.map((el) => {
          return (
            <tr key={el.uid}>
              <td className="uid">{el.uid}</td>
              <td className="category">{el.category}</td>
              <td className="title">
                <NextLink
                  href={`${props.routeName}/[page]`}
                  as={`${props.routeName}/${el.uid}`}>
                  <a>
                    {el.title} [{el.comment_cnt}]
                  </a>
                </NextLink>
              </td>
              <td className="doner">{el.doner}</td>
              <td className="created_at">{el.created_at}</td>
              <td className="view_cnt">{el.view_cnt}</td>
              <td className="like_cnt">{el.like_cnt}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  margin: 3rem 0;
  border-collapse: collapse;

  thead {
    tr {
      height: 2.5rem;
    }
  }

  tbody {
    border: 2px solid ${colors.bluegray[5]};
    border-left: none;
    border-right: none;
    tr {
      height: 1.6rem;
    }
  }

  th,
  td {
    border-bottom: 1px solid ${colors.gray[5]};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    text-align: center;
  }

  th {
    border-top: 1px solid red;

    &.uid {
      width: 4rem;
    }
    &.category {
      width: 4rem;
    }
    &.title {
    }
    &.doner {
      width: 8rem;
    }
    &.created_at {
      width: 4rem;
    }
    &.view_cnt {
      width: 4rem;
    }
    &.like_cnt {
      width: 3rem;
    }
    td {
      &.title {
        text-align: left;
      }
    }
  }
`;
