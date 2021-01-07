import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
import ForumIcon from "@material-ui/icons/Forum";
import SmsIcon from "@material-ui/icons/Sms";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import { colors } from "styles/theme";
import skeleton from "./listSkeleton";

const borderColor = colors.bluegray[3];

export default function fun(props) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <th className="title">
            <ForumIcon></ForumIcon>
          </th>
          <th className="comment">
            <SmsIcon></SmsIcon>
          </th>
          <th className="like">
            <ThumbsUpDownIcon></ThumbsUpDownIcon>
          </th>
          <th className="view">
            <ForumIcon></ForumIcon>
          </th>
          <th className="created">
            <PersonAddIcon></PersonAddIcon>
          </th>
        </tr>
      </thead>
      <tbody>
        {skeleton.map((data, idx) => {
          return (
            <tr key={idx}>
              <td className="title">
                <td className="alarm">sdf</td>
                <span className="content">
                  <div className="head">
                    <span className="idx">#{data.idx}</span>
                    <span
                      className={`category ${
                        data.category === "一般" ? "common" : ""
                      }`}>
                      <ForumIcon className="mIcon wIcon"></ForumIcon>
                      {data.category}
                    </span>
                  </div>
                  <div className="body text">{data.title}</div>
                </span>
              </td>
              <td className="comment text">
                <SmsIcon className="mIcon"></SmsIcon>
                {data.comment_cnt}
              </td>
              <td className="like text">
                {data.like_quantity >= 0 ? (
                  <ThumbUpIcon className="mIcon"></ThumbUpIcon>
                ) : (
                  <ThumbDownIcon className="mIcon"></ThumbDownIcon>
                )}
                {data.like_quantity}
              </td>
              <td className="view text">
                <VisibilityIcon className="mIcon"></VisibilityIcon>
                {data.view_cnt}
              </td>
              <td className="created">
                <span className="icon">
                  <PersonAddIcon className="micon"></PersonAddIcon>
                </span>
                <span className="detail">
                  <div className="donor text">{data.donor}</div>
                  <div className="time">{data.created_at}</div>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
}

const TableWrapper = styled.table.attrs(() => ({}))<{
  categoryColor?: "string";
}>`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;

  border: 1px solid gray;

  margin: 0 auto;

  thead {
    th {
      &.title {
      }
      &.comment {
        text-align: left;
        padding-left: 0.8rem;
        width: 4rem;
      }
      &.like {
        text-align: left;
        padding-left: 0.8rem;
        width: 4rem;
      }
      &.view {
        text-align: left;
        padding-left: 0.8rem;
        width: 4rem;
      }
      &.created {
        text-align: left;
        padding-left: 4rem;
        width: 12rem;
      }
    }
  }

  tbody {
    td {
      border: 1px solid ${borderColor};
      border-left: none;
      border-right: none;

      .mIcon {
        vertical-align: middle;
        transform: scale(0.7);
        color: gray;
      }

      &.text,
      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.title {
        & > .alarm {
          display: table-cell;
          height: 100%;
          width: 5px;
          background-color: gray;
        }

        & > .content {
          display: table-cell;

          padding: 0.2rem 0px;
          padding-left: 0.6rem;

          & > .head {
            & > .idx {
              color: ${colors.gray[0]};
              margin-right: 0.8rem;
            }
            & > .category {
              padding: 2px 0.25rem;
              padding-right: 0.5rem;
              color: white;
              border-radius: 6px;

              .wIcon {
                color: white;
              }

              background-color: ${colors.deeporange[5]};

              &.common {
                background-color: ${colors.cyan[4]};
              }
            }
          }
        }

        & > .body {
        }
      }
      &.comment {
        text-align: left;
      }
      &.like {
        text-align: left;
      }
      &.view {
        text-align: left;
      }
      &.created {
        text-align: left;
        padding-left: 1.2rem;

        & > .icon {
          display: inline-block;
          vertical-align: middle;
          transform: scale(1.3);
          margin-right: 0.8rem;
        }
        & > .detail {
          display: inline-block;
          vertical-align: middle;
          .donor {
            max-width: 8rem;
            color: ${colors.blue[9]};
          }
          .time {
            color: gray;
          }
        }
      }
    }
  }
`;
