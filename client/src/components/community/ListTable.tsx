import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
import NextLink from "next/link";
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

const fontSizeSmall = "0.8rem";

export default function fun(props) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <th className="alarm"></th>
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
        {props.ssp.postsData.map((data, idx) => {
          return (
            <tr key={idx}>
              <td
                className={`alarm ${data.comment_cnt > 0 ? "hi" : "lo"}`}></td>
              <td className="title">
                <div className="head">
                  <span className="idx">#{data.idx}</span>
                  <span
                    className={`category ${
                      data.category === "一般" ? "common" : ""
                    }`}>
                    <ForumIcon
                      fontSize="small"
                      className="mIcon wIcon"></ForumIcon>
                    {data.category}
                  </span>
                </div>
                <div className="body text">
                  <NextLink href={`/community/view?idx=${data.idx}`}>
                    <a>{data.title}</a>
                  </NextLink>
                </div>
              </td>
              <td
                className={`comment text ${
                  data.comment_cnt > 0 ? "hi" : "lo"
                }`}>
                <SmsIcon fontSize="small" className={`mIcon`}></SmsIcon>
                {data.comment_cnt}
              </td>
              <td
                className={`like text ${data.like_quantity > 0 ? "hi" : "lo"}`}>
                {data.like_quantity >= 0 ? (
                  <ThumbUpIcon fontSize="small" className="mIcon"></ThumbUpIcon>
                ) : (
                  <ThumbDownIcon
                    fontSize="small"
                    className={`mIcon`}></ThumbDownIcon>
                )}
                {data.like_quantity}
              </td>
              <td className={`view text ${data.view_cnt > 0 ? "hi" : "lo"}`}>
                <VisibilityIcon
                  fontSize="small"
                  className={`mIcon`}></VisibilityIcon>
                {data.view_cnt}
              </td>
              <td className="created">
                <span className="icon">
                  <PersonAddIcon
                    fontSize="small"
                    className="icon"></PersonAddIcon>
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
      &.alarm {
        width: 6px;
      }
      &.title {
      }
      &.comment {
        text-align: left;
        padding-left: 0.8rem;
        width: 3.5rem;
      }
      &.like {
        text-align: left;
        padding-left: 0.8rem;
        width: 3.5rem;
      }
      &.view {
        text-align: left;
        padding-left: 0.8rem;
        width: 3.5rem;
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
      border: 1px solid ${colors.border.main};
      border-left: none;
      border-right: none;

      padding: 0.5rem 0px;

      .mIcon {
        vertical-align: middle;
        transform: scale(0.7);
      }

      &.text,
      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.alarm {
        &.hi {
          background-color: ${colors.blue[7]};
        }
        &.lo {
          background-color: ${colors.gray[4]};
        }
      }
      &.title {
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
            font-size: ${fontSizeSmall};

            .wIcon {
              color: white;
            }

            background-color: ${colors.deeporange[5]};

            &.common {
              background-color: ${colors.cyan[4]};
            }
          }
        }

        & > .body {
          font-size: 1rem;
        }
      }
      &.like,
      &.view,
      &.comment {
        text-align: left;
        font-size: ${fontSizeSmall};
        &.hi {
          color: ${colors.gray[9]};
        }
        &.lo {
          color: ${colors.gray[5]};
        }
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
            color: ${colors.user.main};
          }
          .time {
            color: gray;
            font-size: ${fontSizeSmall};
          }
        }
      }
    }
  }
`;
