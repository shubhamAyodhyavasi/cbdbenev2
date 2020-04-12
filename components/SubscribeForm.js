import Button from "./form-components/Button";
const SubscribeForm = ({ email, onEmailChange }) => (
	<div className="c-subscribe-from">
		<form className="c-subscribe-from__from">
			<input
				className="c-subscribe-from__input "
				type="email"
				value={email}
				placeholder="your e-mail"
				onChange={onEmailChange}
			/>
			<Button theme="btm-brand" type="submit">
				SUBSCRIBE
			</Button>
		</form>
	</div>
);

export default SubscribeForm;
