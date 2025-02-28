import pdfkit
from flask import render_template
import tempfile

class PDFService:
    @staticmethod
    def generate_candidate_pdf(candidate_data):
        """Generate PDF with candidate information using pdfkit."""
        # Create HTML content for the PDF
        html_content = render_template('candidate_pdf.html', candidate=candidate_data)
        
        # Generate PDF from HTML content
        with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as temp_file:
            pdfkit.from_string(html_content, temp_file.name)
            temp_file_path = temp_file.name
        
        return temp_file_path
