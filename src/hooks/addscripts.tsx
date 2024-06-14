import { useEffect } from "react";

/**
 * Custom hook to append multiple scripts to the document body in sequence.
 *
 * @param urls - Array of script URLs to be added to the document body.
 * @param callback - Optional callback to be executed after all scripts are loaded.
 */
const useScripts = (urls: string[], callback?: () => void): void => {
	useEffect(() => {
		// Function to load a script and return a promise that resolves when the script is loaded
		const loadScript = (url: string) => {
			return new Promise<void>((resolve, reject) => {
				// Check if the script already exists
				if (document.querySelector(`script[src="${url}"]`)) {
					console.log(`Script ${url} already exists`);
					resolve();
					return;
				}

				const script = document.createElement("script");
				script.src = url;
				script.defer = true; // Add the defer attribute

				script.onload = () => {
					console.log(`${url} loaded successfully`);
					resolve();
				};

				script.onerror = () => {
					console.error(`Error loading script: ${url}`);
					reject(new Error(`Script load error for ${url}`));
				};

				document.body.appendChild(script);
			});
		};

		// Load scripts sequentially
		const loadScriptsSequentially = async () => {
			try {
				for (const url of urls) {
					await loadScript(url);
				}
				// Call the callback if provided after all scripts are loaded
				if (callback) callback();
			} catch (error) {
				console.error("Error loading scripts sequentially:", error);
			}
		};

		loadScriptsSequentially();

		// Cleanup function to remove all scripts that were added by this hook
		return () => {
			urls.forEach((url) => {
				const script = document.querySelector(`script[src="${url}"]`);
				if (script) document.body.removeChild(script);
			});
		};
	}, [urls, callback]); // Re-run the effect if urls or callback change
};

export default useScripts;
