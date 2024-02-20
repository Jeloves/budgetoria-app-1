import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "@/firebase/auth";
import { sign } from "crypto";

const testEmail = "test@gmail.com";
const testPassword = "jewxuv-fodmu5-vuCgon";

type LoginFormData = {
	email: string;
	password: string;
};

export default function Login() {
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("inputs changing");
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const router = useRouter();
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const user = await signInUser(formData.email, formData.password);
			router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h1>Log In</h1>
			<h2 style={{ display: "flex" }}>
				New to Budgetoria?&nbsp;<a className="signup">Sign up here!</a>
			</h2>
			<form onSubmit={handleSubmit}>
				<input className="login_credential" id="email" type="email" name="email" placeholder="Email address" required value={formData.email} onChange={handleInputChange} />
				<input className="login_credential" id="password" type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} />

				<div style={{ display: "flex" }}>
					<a className="forgot_password">Forgot password?</a>
				</div>
				<button className="login" type="submit">
					Log In
				</button>
			</form>
		</>
	);
}
