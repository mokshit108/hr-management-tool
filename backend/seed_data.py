from app import create_app
from database import db
from models import JobPosition, Candidate, CandidateStatus
from datetime import datetime, timedelta
import json

app = create_app()

# Current job openings data
JOB_POSITIONS = [
    {
        "title": "Sr. UX Designer",
        "department": "Engineering",
        "location": "Bengaluru",
        "description": "We're looking for a frontend developer with experience in React and modern JavaScript frameworks.",
        "requirements": "- 3+ years of frontend development experience\n- Proficiency in React, JavaScript, and CSS\n- Experience with responsive design and cross-browser compatibility",
        "is_active": True,
        "created_at": datetime.utcnow() - timedelta(days=30)
    },
    {
        "title": "Growth Manager",
        "department": "Engineering",
        "location": "Remote",
        "description": "Join our backend team to build scalable and performant APIs and services.",
        "requirements": "- 4+ years of backend development\n- Experience with Python and Flask/Django\n- Knowledge of database design and SQL",
        "is_active": True,
        "created_at": datetime.utcnow() - timedelta(days=45)
    },
    {
        "title": "Financial Analyst",
        "department": "Product",
        "location": "Mumbai",
        "description": "Lead product development from conception to launch and beyond.",
        "requirements": "- 5+ years of product management experience\n- Experience with agile methodologies\n- Strong analytical and communication skills",
        "is_active": True,
        "created_at": datetime.utcnow() - timedelta(days=15)
    },
    {
        "title": "Data Scientist",
        "department": "Data",
        "location": "Remote",
        "description": "Analyze complex data sets to inform business decisions and product development.",
        "requirements": "- MS or PhD in a quantitative field\n- Experience with machine learning and statistical analysis\n- Proficiency in Python and data visualization",
        "is_active": True,
        "created_at": datetime.utcnow() - timedelta(days=60)
    },
    {
        "title": "UX Designer",
        "department": "Design",
        "location": "Austin, TX",
        "description": "Create intuitive and engaging user experiences for our products.",
        "requirements": "- 3+ years of UX design experience\n- Proficiency with design tools (Figma, Sketch)\n- Portfolio demonstrating user-centered design process",
        "is_active": True,
        "created_at": datetime.utcnow() - timedelta(days=20)
    }
]

# Candidate data with specific attributes including fixed applied_at dates
CANDIDATES = [
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1 (555) 123-4567",
        "skills": "JavaScript, React, HTML, CSS, TypeScript",
        "experience_years": 4.5,
        "education": "Bachelor's in Computer Science",
        "status": CandidateStatus.INTERVIEW,
        "job_title": "Sr. UX Designer",
        "notes": "Strong frontend skills, excellent problem solver",
        "rating": 4.5,
        "applied_at": "2023-01-15T10:30:00",
        "updated_at": "2025-02-20T14:45:00"
    },
    {
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane.smith@example.com",
        "phone": "+1 (555) 987-6543",
        "skills": "Python, Django, Flask, SQL, REST APIs",
        "experience_years": 5.2,
        "education": "Master's in Computer Science",
        "status": CandidateStatus.DESIGNCHALLENEG,
        "job_title": "Growth Manager",
        "notes": "Excellent technical skills, great system design knowledge",
        "rating": 3.5,
        "applied_at": "2023-01-20T09:15:00",
        "updated_at": "2025-02-10T11:30:00"
    },
    {
        "first_name": "Michael",
        "last_name": "Johnson",
        "email": "michael.johnson@example.com",
        "phone": "+1 (555) 456-7890",
        "skills": "Product Strategy, User Research, Agile, JIRA, Roadmapping",
        "experience_years": 7.0,
        "education": "MBA, Business Administration",
        "status": CandidateStatus.HRROUND,
        "job_title": "Financial Analyst",
        "notes": "Exceptional leadership skills, great product vision",
        "rating": 2.5,
        "applied_at": "2023-01-10T13:45:00",
        "updated_at": "2025-02-15T16:20:00"
    },
    {
        "first_name": "Emily",
        "last_name": "Chen",
        "email": "emily.chen@example.com",
        "phone": "+1 (555) 333-2222",
        "skills": "Python, R, SQL, Machine Learning, TensorFlow",
        "experience_years": 3.8,
        "education": "PhD in Computer Science",
        "status": CandidateStatus.SCREENING,
        "job_title": "Data Scientist",
        "notes": "Strong analytical skills, needs more experience with big data",
        "rating": 1.5,
        "applied_at": "2022-02-01T08:00:00",
        "updated_at": "2025-02-25T09:30:00"
    },
    {
        "first_name": "Carlos",
        "last_name": "Rodriguez",
        "email": "carlos.rodriguez@example.com",
        "phone": "+1 (555) 777-8888",
        "skills": "Figma, Sketch, User Research, Wireframing, Prototyping",
        "experience_years": 4.2,
        "education": "Bachelor's in Design",
        "status": CandidateStatus.APPLIED,
        "job_title": "UX Designer",
        "notes": "Good portfolio, needs more experience with complex UX challenges",
        "rating": 3.3,
        "applied_at": "2023-02-28T15:20:00",
        "updated_at": "2025-02-28T15:20:00"
    },
    {
        "first_name": "Sarah",
        "last_name": "Williams",
        "email": "sarah.williams@example.com",
        "phone": "+1 (555) 222-3333",
        "skills": "JavaScript, Vue.js, CSS, HTML, Responsive Design",
        "experience_years": 3.5,
        "education": "Bachelor's in Information Technology",
        "status": CandidateStatus.DESIGNCHALLENEG,
        "job_title": "Sr. UX Designer",
        "notes": "Good technical skills, needs improvement in code organization",
        "rating": 4.2,
        "applied_at": "2022-01-25T11:10:00",
        "updated_at": "2025-02-18T13:40:00"
    },
    {
        "first_name": "David",
        "last_name": "Lee",
        "email": "david.lee@example.com",
        "phone": "+1 (555) 444-5555",
        "skills": "Python, Java, Spring Boot, AWS, Microservices",
        "experience_years": 6.0,
        "education": "Master's in Software Engineering",
        "status": CandidateStatus.INTERVIEW,
        "job_title": "Growth Manager",
        "notes": "Excellent system design skills, good team player",
        "rating": 2.7,
        "applied_at": "2023-01-05T10:00:00",
        "updated_at": "2025-02-12T16:30:00"
    },
    {
        "first_name": "Lisa",
        "last_name": "Brown",
        "email": "lisa.brown@example.com",
        "phone": "+1 (555) 666-7777",
        "skills": "Product Analytics, A/B Testing, Product Strategy, User Stories",
        "experience_years": 5.5,
        "education": "MBA, Product Management",
        "status": CandidateStatus.ACCEPTED,
        "job_title": "Financial Analyst",
        "notes": "Strong analytical approach to product decisions",
        "rating": 2.6,
        "applied_at": "2022-01-12T14:25:00",
        "updated_at": "2025-02-22T11:15:00"
    },
    {
        "first_name": "Kevin",
        "last_name": "Zhang",
        "email": "kevin.zhang@example.com",
        "phone": "+1 (555) 888-9999",
        "skills": "Python, Pandas, Scikit-learn, SQL, Data Visualization",
        "experience_years": 2.8,
        "education": "Master's in Data Science",
        "status": CandidateStatus.REJECTED,
        "job_title": "Data Scientist",
        "notes": "Good theoretical knowledge but lacks practical experience",
        "rating": 1.7,
        "applied_at": "2023-01-18T09:45:00",
        "updated_at": "2025-02-14T10:20:00"
    },
    {
        "first_name": "Maria",
        "last_name": "Garcia",
        "email": "maria.garcia@example.com",
        "phone": "+1 (555) 111-2222",
        "skills": "User Research, Wireframing, Figma, Information Architecture",
        "experience_years": 4.0,
        "education": "Bachelor's in Interaction Design",
        "status": CandidateStatus.INTERVIEW,
        "job_title": "UX Designer",
        "notes": "Great design thinking process, excellent portfolio",
        "rating": 1.7,
        "applied_at": "2024-01-30T13:15:00",
        "updated_at": "2025-02-27T15:40:00"
    },
    {
        "first_name": "Alex",
        "last_name": "Taylor",
        "email": "alex.taylor@example.com",
        "phone": "+1 (555) 333-4444",
        "skills": "JavaScript, React, Redux, Node.js, GraphQL",
        "experience_years": 5.7,
        "education": "Bachelor's in Software Engineering",
        "status": CandidateStatus.HIRED,
        "job_title": "Sr. UX Designer",
        "notes": "Outstanding technical skills, great culture fit",
        "rating": 4.2,
        "applied_at": "2024-01-03T08:30:00",
        "updated_at": "2025-02-25T17:00:00"
    },
    {
        "first_name": "Sophia",
        "last_name": "Kim",
        "email": "sophia.kim@example.com",
        "phone": "+1 (555) 555-6666",
        "skills": "Python, Django, PostgreSQL, Docker, CI/CD",
        "experience_years": 4.3,
        "education": "Master's in Computer Science",
        "status": CandidateStatus.HRROUND,
        "job_title": "Growth Manager",
        "notes": "Strong technical background, excellent communication",
        "rating": 4.8,
        "applied_at": "2023-01-08T11:20:00",
        "updated_at": "2025-02-16T14:10:00"
    }
]

def create_seed_data():
    with app.app_context():
        print("Creating seed data...")
        
        # Clear existing data
        db.session.query(Candidate).delete()
        db.session.query(JobPosition).delete()
        db.session.commit()
        
        # Create job positions
        job_positions = {}
        for job_data in JOB_POSITIONS:
            job = JobPosition(**job_data)
            db.session.add(job)
            job_positions[job_data["title"]] = job
        
        db.session.commit()
        print(f"Created {len(job_positions)} job positions")
        
        # Create candidates
        candidates_count = 0
        for candidate_data in CANDIDATES:
            job_title = candidate_data.pop("job_title")  # Remove job_title from dict
            
            # Convert datetime string to datetime object
            applied_at = datetime.fromisoformat(candidate_data.pop("applied_at"))
            updated_at = datetime.fromisoformat(candidate_data.pop("updated_at"))
            
            # Create candidate
            candidate = Candidate(
                **candidate_data,
                job_position_id=job_positions[job_title].id,
                resume_url=None,  # No resumes for seed data
                applied_at=applied_at,
                updated_at=updated_at
            )
            
            db.session.add(candidate)
            candidates_count += 1
        
        db.session.commit()
        print(f"Created {candidates_count} candidates")
        print("Seed data creation complete!")

if __name__ == "__main__":
    create_seed_data()