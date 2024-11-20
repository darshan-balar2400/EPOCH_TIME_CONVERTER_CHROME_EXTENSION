# Epoch Time Converter Chrome Extension

**Epoch Time Converter** is a simple Chrome extension that allows users to convert epoch time (Unix timestamp) to various time zones on hover and display it in a clean table format.

This extension makes it easy to convert epoch timestamps while browsing and view them in different time formats without leaving the page.

## Features

- Convert epoch time to multiple time zones.
- Display the converted times in a clean and user-friendly table.
- Hover Or Select over any epoch timestamp to automatically see the conversion.
- Simple and intuitive UI.

## Usage

1. After installing the extension, the icon will appear in your Chrome browser toolbar.
2. Whenever you encounter an epoch timestamp on a webpage, select over it.
3. A small table will appear showing the converted times in various time zones.
4. The table will automatically update based on the timestamp you hover over.

## How it Works

- The extension uses content scripts to interact with the web page.
- It matches all URLs (`<all_urls>`) and scans the page for epoch time values.
- When an epoch time is hovered over, the extension converts the time to various time zones and displays them in a table.

## Permissions

- **activeTab**: Required to interact with the currently active tab.
- **host_permissions**: Allows the extension to access all URLs (`*://*/*`), enabling the conversion functionality across different websites.

## Contributing

Feel free to fork the project and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, feel free to reach out to the project maintainers.

## Author

Darshan Balar

