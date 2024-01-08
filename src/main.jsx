import React from "react"
import ReactDOM from "react-dom/client"
import { Venue } from "./Venue.jsx"
import "./index.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Theme>
			<Venue accentColor="amber" appearance="dark" gray="mauve" radius="full" />
		</Theme>
	</React.StrictMode>
)
