import useState from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import moment from 'moment'
import { Modal } from 'antd'
import projectSettings from '../constants/projectSettings'
const OrderListItem = props => {
    const [isModal, setIsModal] = useState(false)
    const {
        versions, parentClass, order, serial, reorder
    } = props
    const componentClass = "c-order-list-item"
    const versionClass = versions.map(el => (`${componentClass}--${el}`)).join(" ")
    const parent = `${parentClass}__${componentClass.replace("c-", "")}`
    const className = classNames(componentClass, {
        [versionClass]: versions,
        [parent]: parentClass,
    })
    const {
        products, grandTotal, createdOn, _id
    } = order
    const isReviewRemain = products.some(el => !el.reviewed)


    return (
        <div className={className}>
            <div serial={serial} className={`${componentClass}__inner`}>
                <div data-title="products" className={`${componentClass}__title-wrapper`}>
                    {
                        products.map((el, key) => {
                            return <Link key={key}>
                                <a className={`${componentClass}__link ${componentClass}__link--title`}
                                    href={`/shop/${el.productMeta}`}>{el.title}</a>
                            </Link>
                        })
                    }
                </div>
                <div data-title="price" className={`${componentClass}__price`}>
                    $ {grandTotal}
                </div>
                <div data-title="date" className={`${componentClass}__date`}>
                    {moment(createdOn).format("MMM DD, YYYY")}
                </div>
                <div className={`${componentClass}__actions`}>
                    <div className={`${componentClass}__action`}>
                        <Link href="#">
                            <a className={`${componentClass}__link`}>View</a>
                        </Link>
                    </div>
                    <div className={`${componentClass}__action`}>
                        <span onClick={() => reorder(order)} className={`${componentClass}__link`}>Reorder</span>
                    </div>
                    <div className={`${componentClass}__action`}>
                        <a href={`${projectSettings.invoiceUrl}/${_id}.pdf`} target="_blank" className={`${componentClass}__link`}>Invoice</a>
                    </div>
                </div>
            </div>
            <div className={`${componentClass}__review-wrapper`}>
                {isReviewRemain && <Link href="#">
                    <a className={`${componentClass}__link ${componentClass}__link--underline-gold`}>Write a product review</a>
                </Link>}
            </div>
            <Modal
                maskClosable={true}
                footer={null}
                onOk={() => {
                    setIsModal(false)
                }}
                onCancel={() => {
                    setIsModal(false)
                }}
                visible={isModal}>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((el, key) => {

                                return (
                                    <tr key={i}>
                                        <td data-label="Title"> {itm.title}</td>
                                        <td data-label="Rate" className="inline-data">
                                            {"$ " + itm.unitPrice}

                                        </td>
                                        <td data-label="Quantity" className="inline-data">
                                            {itm.qty}
                                        </td>
                                        <td data-label="Price" className="inline-data">
                                            {itm.subscribed ? (
                                                <div>
                                                    <strike>
                                                        {"$ " + itm.unitPrice * itm.qty}
                                                    </strike>
                                                    <br />
                                                    {/* <span>
                                      {basicFunction.currancyAddWithNumber(
                                        itm.unitPrice * itm.qty -
                                          basicFunction.getParchantage(
                                            itm.subscribedDiscountPersent,
                                            itm.unitPrice * itm.qty
                                          )
                                      )}
                                    </span> */}
                                                </div>
                                            ) : (
                                                    "$ " + itm.subTotal
                                                )}
                                        </td>
                                    </tr>
                                );
                            })
                        }


                        <tr className="order-view-bottom">
                            <td className="hide-in-res" colSpan="3">
                                Sub Total
                            </td>
                            <td data-label="Sub Total" className="inline-data">
                                $ {order.wholeSubtotal}
                            </td>
                        </tr>
                        <tr className="order-view-bottom">
                            <td className="hide-in-res" colSpan="3">
                                Shipping Charge
                            </td>
                            <td data-label="Shipping Charge" className="inline-data">
                                $ {order.shippingCharge}
                            </td>
                        </tr>
                        {/* <tr className="order-view-bottom">
                            <td className="hide-in-res" colSpan="3">
                                Estimated Tax
                            </td>
                            <td data-label="Estimated Tax" className="inline-data">
                                {basicFunction.currancyAddWithNumber(
                                    basicFunction.getParchantage(
                                        parseFloat(this.state.orderSingle.countryTax),
                                        this.state.orderSingle.wholeSubtotal +
                                        this.state.orderSingle.shippingcharge
                                    ) ||
                                    (this.state.orderSingle.taxAmount &&
                                        this.state.orderSingle.taxAmount.toFixed(2)) ||
                                    0
                                )}
                            </td>
                        </tr> */}
                        {/* {this.state.orderSingle.couponDisc ? (
                            <tr className="order-view-bottom">
                                <td className="hide-in-res" colSpan="3">
                                    Coupon discount ( {this.state.orderSingle.couponDisc}
                                    %)
                                </td>
                                <td
                                    data-label="Coupon discount"
                                    className="inline-data"
                                >
                                    -{" "}
                                    {basicFunction.currancyAddWithNumber(
                                        basicFunction.getParchantage(
                                            parseFloat(this.state.orderSingle.couponDisc),
                                            this.state.orderSingle.wholeSubtotal
                                        ) || 0
                                    )}
                                </td>
                            </tr>
                        ) : (
                                ""
                            )} */}

                        <tr className="order-view-bottom">
                            <td className="hide-in-res" colSpan="3">
                                Grand Total
                        </td>
                            <td data-label="Grand Total" className="inline-data">
                                $ {order.grandTotal}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        </div >
    )
}
OrderListItem.defaultProps = {
    versions: []
}
export default OrderListItem