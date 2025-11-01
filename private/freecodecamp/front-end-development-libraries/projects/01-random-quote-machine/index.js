import crossFetch from "https://cdn.skypack.dev/cross-fetch@3.1.5";
import {
	StrictMode,
	useCallback,
	useEffect,
	useState,
} from "https://cdn.skypack.dev/react@17.0.1";
import { render } from "https://cdn.skypack.dev/react-dom@17.0.1";

function App() {
	const [quote, setQuote] = useState({});
	const fetchQuote = useCallback(() => {
		crossFetch("https://api.adviceslip.com/advice")
			.then((res) => res.json())
			.then(({ slip: { id, advice: text } }) => {
				setQuote({
					text,
					author: `Advice ${id}`,
				});
			})
			.catch((e) => {
				setQuote({ text: e });
			});
	}, []);
	useEffect(() => {
		fetchQuote();
	}, []);
	return (
		<div id="quote-box">
			<div id="text">{quote.text}</div>
			<div id="author">{quote.author}</div>
			<button type="button" id="new-quote" className="btn" onClick={fetchQuote}>
				New Quote
			</button>
			<a
				id="tweet-quote"
				className="btn"
				href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
					quote.text,
				)}`}
				target="_blank"
			>
				Tweet
			</a>
		</div>
	);
}

render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("app-root"),
);
