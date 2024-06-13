declare var App: {
	init: () => void;
};

declare global {
	interface window {
		RevSlider?: any; // Add other properties as needed
	}
}
