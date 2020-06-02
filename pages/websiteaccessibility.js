import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";
import { projectName } from "../constants/projectSettings";
const privacy = () => {
	return (
		<Layout headerVersions={["bg-light"]} headerTheme="dark">
			<div className="c-privacy__page-title">
				<Heading versions={["large"]} parentClass="c-privacy">
					PRIVACY AND COOKIES POLICY
				</Heading>
			</div>
			<div className="c-privacy__content">
				<Heading>Welcome to CBD {projectName}</Heading>
				<div className="container">
					{projectName} LLC, a Delaware limited liability company d/b/a CBDbené
					collectively referred to in this privacy policy as “CBDbene,” the
					“Company” or sometimes “we” or “us” or “our”), operates the site
					located at the URL www.CBDbene.com (together with any other site or
					applications branded as {projectName} (collectively, the “Site”).{" "}
					{projectName} respects your privacy rights and is committed to
					protecting the information we collect from you online.
				</div>
			</div>
		</Layout>
	);
};

export default privacy;
