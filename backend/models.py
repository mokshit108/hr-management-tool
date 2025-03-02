from database import db
from datetime import datetime
import enum

class CandidateStatus(enum.Enum):
    APPLIED = "Applied"
    SCREENING = "Screening"
    DESIGNCHALLENEG = "Design Challenge"
    INTERVIEW = "Interview"
    HRROUND = "HR Round"
    HIRED = "Hired"
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"

class JobPosition(db.Model):
    __tablename__ = 'job_positions'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    requirements = db.Column(db.Text, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship with candidates
    candidates = db.relationship('Candidate', backref='job_position', lazy=True)
    
    def __repr__(self):
        return f'<JobPosition {self.title}>'

class Candidate(db.Model):
    __tablename__ = 'candidates'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    resume_url = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Enum(CandidateStatus), default=CandidateStatus.APPLIED)
    skills = db.Column(db.Text, nullable=True)
    experience_years = db.Column(db.Float, nullable=True)
    education = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, nullable=True)
    
    
    # Foreign key to job position
    job_position_id = db.Column(db.Integer, db.ForeignKey('job_positions.id'))
    
    # Interview notes and feedback
    notes = db.Column(db.Text, nullable=True)
    
    # Timestamps
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Candidate {self.first_name} {self.last_name}>'