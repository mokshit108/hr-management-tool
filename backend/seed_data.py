from app import create_app
from database import db
from models import JobPosition, Candidate, CandidateStatus
from datetime import datetime, timedelta
import random
import re

app = create_app()

# Sample data
JOB_POSITIONS = [
    {
        "title": "Frontend Developer",
        "department": "Engineering",
        "location": "San Francisco, CA",
        "description": "We're looking for a frontend developer with experience in React and modern JavaScript frameworks.",
        "requirements": "- 3+ years of frontend development experience\n- Proficiency in React, JavaScript, and CSS\n- Experience with responsive design and cross-browser compatibility",
    },
    {
        "title": "Backend Engineer",
        "department": "Engineering",
        "location": "Seattle, WA",
        "description": "Join our backend team to build scalable and performant APIs and services.",
        "requirements": "- 4+ years of backend development\n- Experience with Python and Flask/Django\n- Knowledge of database design and SQL",
    },
    {
        "title": "Product Manager",
        "department": "Product",
        "location": "New York, NY",
        "description": "Lead product development from conception to launch and beyond.",
        "requirements": "- 5+ years of product management experience\n- Experience with agile methodologies\n- Strong analytical and communication skills",
    },
    {
        "title": "Data Scientist",
        "department": "Data",
        "location": "Remote",
        "description": "Analyze complex data sets to inform business decisions and product development.",
        "requirements": "- MS or PhD in a quantitative field\n- Experience with machine learning and statistical analysis\n- Proficiency in Python and data visualization",
    },
    {
        "title": "UX Designer",
        "department": "Design",
        "location": "Austin, TX",
        "description": "Create intuitive and engaging user experiences for our products.",
        "requirements": "- 3+ years of UX design experience\n- Proficiency with design tools (Figma, Sketch)\n- Portfolio demonstrating user-centered design process",
    }
]

CANDIDATE_FIRST_NAMES = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "James", 
    "Isabella", "Oliver", "Charlotte", "Benjamin", "Amelia", "Elijah", "Mia", 
    "Lucas", "Harper", "Mason", "Evelyn", "Logan"
]

CANDIDATE_LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", 
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", 
    "Thomas", "Taylor", "Moore", "Jackson", "Martin"
]

SKILLS_BY_DEPARTMENT = {
    "Engineering": [
        "JavaScript", "React", "Vue.js", "Angular", "TypeScript", "HTML", "CSS", 
        "Node.js", "Python", "Django", "Flask", "Ruby", "Rails", "Java", "Spring Boot", 
        "C#", ".NET", "REST APIs", "GraphQL", "Git", "CI/CD", "AWS", "Docker", "Kubernetes"
    ],
    "Product": [
        "Product Strategy", "User Research", "Market Analysis", "A/B Testing", "Roadmapping", 
        "Agile", "Scrum", "Kanban", "JIRA", "Wireframing", "Prototyping", "Stakeholder Management",
        "Product Analytics", "KPI Definition", "User Stories", "Competitive Analysis"
    ],
    "Data": [
        "Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch",
        "Data Visualization", "Tableau", "Power BI", "Statistics", "Machine Learning", 
        "Natural Language Processing", "Data Modeling", "ETL", "Big Data", "Spark", "Hadoop"
    ],
    "Design": [
        "Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "InDesign", 
        "User Research", "Usability Testing", "Wireframing", "Prototyping", 
        "Information Architecture", "Visual Design", "Interaction Design", 
        "Responsive Design", "Accessibility", "Design Systems"
    ]
}

EDUCATION_OPTIONS = [
    "Bachelor's in Computer Science",
    "Master's in Computer Science",
    "Bachelor's in Information Technology",
    "Master's in Information Technology",
    "Bachelor's in Software Engineering",
    "Bachelor's in Business Administration",
    "Master's in Business Administration",
    "Bachelor's in Design",
    "Master's in Design",
    "Bachelor's in Data Science",
    "Master's in Data Science",
    "PhD in Computer Science",
    "Associate's in Web Development",
    "Self-taught / Bootcamp Graduate"
]

def get_random_skills(department, num_skills=5):
    department_skills = SKILLS_BY_DEPARTMENT.get(
        department, 
        SKILLS_BY_DEPARTMENT["Engineering"]  # Default to Engineering if department not found
    )
    skills = random.sample(department_skills, min(num_skills, len(department_skills)))
    return ", ".join(skills)

def get_random_status():
    statuses = [status for status in CandidateStatus]
    weights = [0.3, 0.25, 0.2, 0.1, 0.05, 0.05, 0.05]  # More weight to early stages
    return random.choices(statuses, weights=weights, k=1)[0]

def get_random_applied_date():
    days_ago = random.randint(1, 90)
    return datetime.utcnow() - timedelta(days=days_ago)

def generate_note(candidate, job):
    notes = [
        f"Strong background in {random.choice(candidate.skills.split(', '))}, could be a good fit for the team.",
        f"Candidate has relevant experience, but missing some key skills for the {job.title} role.",
        "Excellent communication skills during the initial phone screening.",
        "Promising candidate but needs additional technical assessment.",
        "Great cultural fit, team recommended moving forward.",
        "Concerns about experience level, may need more mentoring.",
        "Candidate showed strong problem-solving skills during the technical interview.",
        f"Previously worked at a competitor, has valuable industry knowledge for our {job.department} team.",
        "Follow-up interview recommended to assess team fit.",
        None  # Sometimes no notes
    ]
    return random.choice(notes)

def create_seed_data():
    with app.app_context():
        print("Creating seed data...")
        
        # Clear existing data
        db.session.query(Candidate).delete()
        db.session.query(JobPosition).delete()
        db.session.commit()
        
        # Create job positions
        jobs = []
        for job_data in JOB_POSITIONS:
            job = JobPosition(**job_data)
            db.session.add(job)
            jobs.append(job)
        
        db.session.commit()
        print(f"Created {len(jobs)} job positions")
        
        # Create candidates for each job
        candidates_count = 0
        for job in jobs:
            num_candidates = random.randint(5, 15)  # Random number of candidates per job
            
            for _ in range(num_candidates):
                first_name = random.choice(CANDIDATE_FIRST_NAMES)
                last_name = random.choice(CANDIDATE_LAST_NAMES)
                email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 999)}@example.com"
                
                # Generate random phone number
                phone = f"+1 ({random.randint(100, 999)}) {random.randint(100, 999)}-{random.randint(1000, 9999)}"
                
                # Generate random experience years based on the job
                exp_match = re.search(r"(\d+)", job.requirements)
                min_exp = int(exp_match.group(1)) if exp_match else 1
                max_exp = min_exp + random.randint(1, 7)
                experience_years = round(random.uniform(min_exp, max_exp), 1)
                
                # Generate random skills based on department
                skills = get_random_skills(job.department, random.randint(3, 8))
                
                # Get random education
                education = random.choice(EDUCATION_OPTIONS)
                
                # Generate random status
                status = get_random_status()
                
                # Generate random applied date
                applied_at = get_random_applied_date()
                
                # Create candidate
                candidate = Candidate(
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    phone=phone,
                    resume_url=None,  # No resumes for seed data
                    status=status,
                    skills=skills,
                    experience_years=experience_years,
                    education=education,
                    job_position_id=job.id,
                    applied_at=applied_at,
                    updated_at=applied_at + timedelta(days=random.randint(0, 10))
                )
                
                # Generate notes based on status
                if status != CandidateStatus.APPLIED:
                    candidate.notes = generate_note(candidate, job)
                
                db.session.add(candidate)
                candidates_count += 1
        
        db.session.commit()
        print(f"Created {candidates_count} candidates")
        print("Seed data creation complete!")

if __name__ == "__main__":
    create_seed_data()