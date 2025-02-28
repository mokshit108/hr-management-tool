from models import Candidate, CandidateStatus, db
from marshmallow import Schema, fields

class CandidateSchema(Schema):
    id = fields.Int(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str()
    resume_url = fields.Str()
    status = fields.Str()
    skills = fields.Str()
    experience_years = fields.Float()
    education = fields.Str()
    job_position_id = fields.Int(required=True)
    notes = fields.Str()
    applied_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    # Include job information in the response
    job_title = fields.Str(attribute="job_position.title")
    job_department = fields.Str(attribute="job_position.department")

class CandidateService:
    @staticmethod
    def get_all_candidates(search=None, status=None, sort_by='applied_at', sort_order='desc'):
        query = Candidate.query
        
        # Apply search filter
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                (Candidate.first_name.ilike(search_term)) | 
                (Candidate.last_name.ilike(search_term)) |
                (Candidate.email.ilike(search_term)) |
                (Candidate.skills.ilike(search_term))
            )
        
        # Apply status filter
        if status:
            query = query.filter(Candidate.status == status)
        
        # Apply sorting
        if sort_order == 'asc':
            query = query.order_by(getattr(Candidate, sort_by).asc())
        else:
            query = query.order_by(getattr(Candidate, sort_by).desc())
            
        candidates = query.all()
        schema = CandidateSchema(many=True)
        return schema.dump(candidates)
    
    @staticmethod
    def get_candidate_by_id(candidate_id):
        candidate = Candidate.query.get_or_404(candidate_id)
        schema = CandidateSchema()
        return schema.dump(candidate)
    
    @staticmethod
    def create_candidate(data):
        schema = CandidateSchema()
        candidate_data = schema.load(data)
        
        new_candidate = Candidate(
            first_name=candidate_data['first_name'],
            last_name=candidate_data['last_name'],
            email=candidate_data['email'],
            phone=candidate_data.get('phone'),
            resume_url=candidate_data.get('resume_url'),
            skills=candidate_data.get('skills'),
            experience_years=candidate_data.get('experience_years'),
            education=candidate_data.get('education'),
            job_position_id=candidate_data['job_position_id'],
            notes=candidate_data.get('notes')
        )
        
        db.session.add(new_candidate)
        db.session.commit()
        
        return schema.dump(new_candidate)
    
    @staticmethod
    def update_candidate_status(candidate_id, new_status):
        candidate = Candidate.query.get_or_404(candidate_id)
        
        try:
            candidate.status = CandidateStatus[new_status.upper()]
            db.session.commit()
            schema = CandidateSchema()
            return schema.dump(candidate)
        except KeyError:
            raise ValueError(f"Invalid status: {new_status}")
    
    @staticmethod
    def import_candidates(candidates_data):
        schema = CandidateSchema(many=True)
        candidates = []
        
        for candidate_data in candidates_data:
            new_candidate = Candidate(
                first_name=candidate_data['first_name'],
                last_name=candidate_data['last_name'],
                email=candidate_data['email'],
                phone=candidate_data.get('phone'),
                resume_url=candidate_data.get('resume_url'),
                skills=candidate_data.get('skills'),
                experience_years=candidate_data.get('experience_years'),
                education=candidate_data.get('education'),
                job_position_id=candidate_data['job_position_id'],
                notes=candidate_data.get('notes')
            )
            db.session.add(new_candidate)
            candidates.append(new_candidate)
        
        db.session.commit()
        return schema.dump(candidates)