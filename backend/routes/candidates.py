from flask import Blueprint, request, jsonify, send_file
from services.candidate_service import CandidateService
from services.pdf_service import PDFService
import os

candidates_bp = Blueprint('candidates', __name__, url_prefix='/api/candidates')

@candidates_bp.route('', methods=['GET'])
def get_candidates():
    search = request.args.get('search', '')
    status = request.args.get('status', '')
    sort_by = request.args.get('sort_by', 'applied_at')
    sort_order = request.args.get('sort_order', 'desc')
    
    candidates = CandidateService.get_all_candidates(
        search=search, 
        status=status, 
        sort_by=sort_by, 
        sort_order=sort_order
    )
    
    return jsonify(candidates)

@candidates_bp.route('/<int:candidate_id>', methods=['GET'])
def get_candidate(candidate_id):
    candidate = CandidateService.get_candidate_by_id(candidate_id)
    return jsonify(candidate)

@candidates_bp.route('', methods=['POST'])
def create_candidate():
    data = request.get_json()
    try:
        candidate = CandidateService.create_candidate(data)
        return jsonify(candidate), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@candidates_bp.route('/<int:candidate_id>/status', methods=['PUT'])
def update_candidate_status(candidate_id):
    data = request.get_json()
    new_status = data.get('status')
    
    if not new_status:
        return jsonify({'error': 'Status is required'}), 400
    
    try:
        candidate = CandidateService.update_candidate_status(candidate_id, new_status)
        return jsonify(candidate)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Candidate not found'}), 404

@candidates_bp.route('/import', methods=['POST'])
def import_candidates():
    data = request.get_json()
    
    if not isinstance(data, list):
        return jsonify({'error': 'Expected an array of candidates'}), 400
    
    try:
        candidates = CandidateService.import_candidates(data)
        return jsonify(candidates), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@candidates_bp.route('/<int:candidate_id>/pdf', methods=['GET'])
def generate_pdf(candidate_id):
    try:
        candidate = CandidateService.get_candidate_by_id(candidate_id)
        pdf_path = PDFService.generate_candidate_pdf(candidate)
        
        # Send PDF file as response
        response = send_file(
            pdf_path,
            as_attachment=True,
            download_name=f"candidate_{candidate_id}.pdf",
            mimetype='application/pdf'
        )
        
        # Delete the temporary file after sending
        @response.call_on_close
        def cleanup():
            try:
                os.remove(pdf_path)
            except:
                pass
                
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500