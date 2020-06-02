import Link from "next/link";
import classNames from "classnames";
import { projectName } from "../constants/projectSettings";
const Logo = ({ versions, parentClass, full, text }) => {
	const componentClass = `c-logo`;
	const versionClass = versions
		.map((el) => `${componentClass}--${el}`)
		.join(" ");
	const parent = `${parentClass}__${componentClass.replace("c-", "")}`;
	const className = classNames(componentClass, {
		[versionClass]: versions,
		[parent]: parentClass,
	});

	if (text) {
		return (
			<Link href="/">
				<a className={className}>
					<img
						src="/images/logo-text.png"
						className="c-logo__img"
						alt={projectName}
					/>
				</a>
			</Link>
		);
	}
	return (
		<Link href="/">
			<a className={className}>
				{!full && (
					<img
						src="/images/logo-new.png"
						className="c-logo__img"
						alt={projectName}
					/>
				)}
				{full && (
					<img
						src="/images/logo.png"
						className="c-logo__img"
						alt={projectName}
					/>
				)}
			</a>
		</Link>
	);
};
Logo.defaultProps = {
	versions: [],
	full: false,
};
export default Logo;
