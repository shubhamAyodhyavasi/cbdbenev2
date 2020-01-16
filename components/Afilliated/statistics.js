import React, { Component } from "react";
import { Table } from "reactstrap";
import BasicFunction from "../../services/extra/basicFunction";
import { referralPresent } from "../../constants/Constants";
const basicFunction = new BasicFunction();
export default class Statistics extends Component {
  render() {
    const {
      countUnpaid,
      countPaid,
      ambassador_data,
      totalCount,
      amountUnPaid,
      amountPaid
    } = this.props;
    return (
      <div>
        <Table className="new-res-table" bordered>
          <thead>
            <tr>
              <th className="w-25">Unpaid Referrals</th>
              <th className="w-25">Paid Referrals</th>
              <th className="w-25">Visits</th>
              <th className="w-25">Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th data-label="Unpaid Referrals" className="inline-data">
                {countUnpaid}
              </th>
              <td data-label="Paid Referrals" className="inline-data">
                {countPaid}
              </td>
              <td data-label="Visits" className="inline-data">
                {ambassador_data && ambassador_data.urlvisits
                  ? ambassador_data.urlvisits.length
                  : 0}
              </td>
              <td data-label="Conversion Rate" className="inline-data">
                {basicFunction.nombarFormat(
                  basicFunction.getUnknownParchantage(
                    totalCount,
                    ambassador_data
                      ? ambassador_data.urlvisits
                        ? ambassador_data.urlvisits.length
                        : 0
                      : 0
                  ) || 0
                )}{" "}
                %
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <Table className="new-res-table" bordered>
          <thead>
            <tr>
              <th className="w-25">Unpaid Earnings</th>
              <th className="w-50">Paid Earnings</th>
              <th className="w-25">Commission Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th data-label="Unpaid Earnings" className="inline-data">
                {basicFunction.currancyAddWithNumber(
                  basicFunction.getParchantage(25, amountUnPaid)
                )}
              </th>
              <td data-label="Paid Earnings" className="inline-data">
                {" "}
                {basicFunction.currancyAddWithNumber(
                  basicFunction.getParchantage(25, amountPaid)
                )}
              </td>
              <td data-label="Commission Rate" className="inline-data">
                {`${referralPresent}%`}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
