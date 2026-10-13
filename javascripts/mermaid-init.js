// Initialize Mermaid diagrams for ReadTheDocs theme
document.addEventListener('DOMContentLoaded', function() {
    // Find all <pre class="mermaid"><code> blocks and unwrap them
    const mermaidBlocks = document.querySelectorAll('pre.mermaid > code');

    mermaidBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentNode;
        let mermaidCode = codeBlock.textContent;

        // Unescape HTML entities
        mermaidCode = mermaidCode
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

        // Create a new div for Mermaid
        const div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = mermaidCode;

        // Replace the pre block with the div
        pre.parentNode.replaceChild(div, pre);
    });

    // Initialize Mermaid with balanced sizing
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        logLevel: 'error',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
            nodeSpacing: 70,
            rankSpacing: 80,
            padding: 20,
            diagramPadding: 20
        },
        themeVariables: {
            fontSize: '15px',
            primaryColor: '#f8f9fa',
            primaryTextColor: '#212529',
            primaryBorderColor: '#6c757d',
            lineColor: '#6c757d',
            secondaryColor: '#e9ecef',
            tertiaryColor: '#dee2e6'
        }
    });

    // Manually render all diagrams
    mermaid.run();
});
