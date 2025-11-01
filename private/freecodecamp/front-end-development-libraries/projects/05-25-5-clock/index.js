import {
	StrictMode,
	useEffect,
	useReducer,
	useRef,
} from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const DEFAULT_SESSION = 25 * 60;
const DEFAULT_BREAK = 5 * 60;
const DEFAULT_INTERVAL = 1000;

const INIT_STATE = {
	break: DEFAULT_BREAK,
	session: DEFAULT_SESSION,
	counter: DEFAULT_SESSION,
	isSession: true,
	isPlaying: false,
};

function DateTimeout(fn, delay) {
	this.fn = fn;
	this.delay = delay;
	this.next = Date.now() + parseInt(delay, 10);
	this.ref = null;
}
DateTimeout.prototype.exec = function dateTimeoutExec() {
	const innerExec = () => {
		let timeoutDelay = this.next - Date.now();
		timeoutDelay = timeoutDelay < 0 ? 0 : timeoutDelay;
		if (this.ref) {
			window.clearTimeout(this.ref);
		}
		this.next += this.delay;
		this.ref = window.setTimeout(innerExec, timeoutDelay);
		this.fn();
	};
	let timeoutDelay = this.next - Date.now();
	timeoutDelay = timeoutDelay < 0 ? 0 : timeoutDelay;
	if (this.ref) {
		window.clearTimeout(this.ref);
	}
	this.next += this.delay;
	this.ref = window.setTimeout(innerExec, timeoutDelay);
};
DateTimeout.prototype.clear = function dateTimeoutClear() {
	if (this.ref) {
		window.clearTimeout(this.ref);
	}
	this.ref = null;
};

const prepadZero = (value, count = 2) =>
	`${[...Array(count)].fill(0).join("")}${value}`.slice(-1 * count);

const rangedValue = (value, min = 60, max = 3600, roundBase = 60) => {
	let returnValue = value;
	if (value < min) {
		returnValue = min;
	} else if (value > max) {
		returnValue = max;
	}
	return roundBase > 0
		? roundBase * Math.ceil(returnValue / roundBase)
		: returnValue;
};

const stateReducer = (prevState, action) => {
	const nextState = { ...prevState };
	switch (action) {
		case "COUNT":
			nextState.isSession = nextState.counter
				? nextState.isSession
				: !nextState.isSession;
			nextState.counter =
				nextState.counter > 0
					? nextState.counter - 1
					: nextState.isSession
						? nextState.session
						: nextState.break;
			break;
		case "TOGGLE":
			nextState.isPlaying = !nextState.isPlaying;
			break;
		case "RESET":
			Object.assign(nextState, INIT_STATE);
			break;
		case "SESSION_INC":
			nextState.session = rangedValue(nextState.session + 60);
			nextState.counter =
				!nextState.isPlaying && nextState.isSession
					? nextState.session
					: nextState.counter;
			break;
		case "SESSION_DEC":
			nextState.session = rangedValue(prevState.session - 60);
			nextState.counter =
				!nextState.isPlaying && nextState.isSession
					? nextState.session
					: nextState.counter;
			break;
		case "BREAK_INC":
			nextState.break = rangedValue(prevState.break + 60);
			nextState.counter =
				!nextState.isPlaying && !nextState.isSession
					? nextState.break
					: nextState.counter;
			break;
		case "BREAK_DEC":
			nextState.break = rangedValue(prevState.break - 60);
			nextState.counter =
				!nextState.isPlaying && !nextState.isSession
					? nextState.break
					: nextState.counter;
			break;
		default:
			break;
	}

	return nextState;
};

function App() {
	const audioRef = useRef(null);

	const [state, updateState] = useReducer(stateReducer, INIT_STATE);

	const {
		break: breakValue,
		session: sessionValue,
		counter,
		isSession,
		isPlaying,
	} = state || {};

	useEffect(() => {
		const dateTimeout = new DateTimeout(() => {
			updateState("COUNT");
		}, DEFAULT_INTERVAL);
		if (isPlaying) {
			dateTimeout.exec();
		} else {
			dateTimeout.clear();
		}
		return () => {
			dateTimeout.clear();
		};
	}, [isPlaying]);

	useEffect(() => {
		if (isPlaying && !counter && audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		}
	}, [isPlaying, counter]);

	const counterValue = `${prepadZero(parseInt(counter / 60, 10))}:${prepadZero(counter % 60)}`;

	return (
		<div className="container">
			<div id="session" className="block">
				<div id="session-length" className="display">
					{parseInt(sessionValue / 60, 10)}
				</div>
				<button
					type="button"
					id="session-increment"
					className="btn btnUp"
					onClick={() => {
						updateState("SESSION_INC");
					}}
				>
					➕
				</button>
				<button
					type="button"
					id="session-decrement"
					className="btn btnDown"
					onClick={() => {
						updateState("SESSION_DEC");
					}}
				>
					➖
				</button>
				<div id="session-label" className="label">
					Session
				</div>
			</div>

			<div id="timer" className="block">
				<div id="time-left" className="display">
					{counterValue}
				</div>
				<audio
					id="beep"
					preload="auto"
					ref={audioRef}
					src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
				/>
				<button
					type="button"
					id="start_stop"
					className="btn btnUp"
					onClick={() => {
						updateState("TOGGLE");
					}}
				>
					▶️
				</button>
				<button
					type="button"
					id="reset"
					className="btn btnDown"
					onClick={() => {
						updateState("RESET");
						if (audioRef.current) {
							audioRef.current.pause();
							audioRef.current.currentTime = 0;
						}
					}}
				>
					🔁
				</button>
				<div id="timer-label" className="label">
					<em>{isSession ? "Go!" : "Rest"}</em>
				</div>
			</div>

			<div id="break" className="block">
				<div id="break-length" className="display">
					{parseInt(breakValue / 60, 10)}
				</div>
				<button
					type="button"
					id="break-increment"
					className="btn btnUp"
					onClick={() => {
						updateState("BREAK_INC");
					}}
				>
					➕
				</button>
				<button
					type="button"
					id="break-decrement"
					className="btn btnDown"
					onClick={() => {
						updateState("BREAK_DEC");
					}}
				>
					➖
				</button>
				<div id="break-label" className="label">
					Break
				</div>
			</div>
		</div>
	);
}

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("app-root"),
);
