export const dynamic = 'force-static';

export default function AboutPage() {
    const skills = [
        { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'] },
        { category: 'Backend', items: ['Node.js', 'Express.js', 'Prisma', 'REST APIs', 'GraphQL'] },
        { category: 'Database', items: ['PostgreSQL', 'Neon Database', 'MongoDB', 'Redis', 'SQL'] },
        { category: 'Tools & DevOps', items: ['Git', 'Docker', 'Vercel', 'AWS', 'CI/CD'] },
    ];

    const experience = [
        {
            title: 'Senior Full Stack Developer',
            company: 'Tech Innovations Inc.',
            period: '2023 - Present',
            description: 'Leading development of scalable web applications using Next.js, Express.js, and Prisma. Architected microservices handling 100k+ daily users.',
        },
        {
            title: 'Frontend Developer',
            company: 'Digital Solutions Ltd.',
            period: '2021 - 2023',
            description: 'Developed responsive web applications using React and TypeScript. Improved application performance by 40% through optimization techniques.',
        },
        {
            title: 'Junior Developer',
            company: 'StartupHub',
            period: '2020 - 2021',
            description: 'Built interactive user interfaces and implemented RESTful APIs. Collaborated with cross-functional teams in agile environment.',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-20">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center">
                        <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-8 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">JA</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Hi, I&apos;m Jubayer Alam
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Full Stack Developer passionate about creating exceptional digital experiences 
                            through clean code, innovative solutions, and modern technologies.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:jubayer.alam@example.com"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Get In Touch
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto max-w-4xl px-6">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">About Me</h2>
                        <div className="text-gray-600 leading-relaxed space-y-6">
                            <p>
                                With over 4 years of experience in full-stack development, I specialize in building 
                                scalable web applications that deliver exceptional user experiences. My journey began 
                                with a curiosity for how things work on the web, which evolved into a passion for 
                                crafting elegant solutions to complex problems.
                            </p>
                            <p>
                                I believe in writing clean, maintainable code and staying up-to-date with the latest 
                                technologies and best practices. My approach combines technical expertise with a deep 
                                understanding of user needs, ensuring that every project I work on not only functions 
                                flawlessly but also provides value to its users.
                            </p>
                            <p>
                                When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                                open-source projects, or sharing my knowledge through technical blogs and community 
                                involvement. I&apos;m always excited to take on new challenges and collaborate with 
                                like-minded professionals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-6xl px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Technical Skills
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A comprehensive toolkit for building modern, scalable web applications
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skills.map((skillGroup, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">{skillGroup.category}</h3>
                                <ul className="space-y-2">
                                    {skillGroup.items.map((skill, skillIndex) => (
                                        <li key={skillIndex} className="text-gray-600 text-sm flex items-center">
                                            <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto max-w-4xl px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Professional Experience
                        </h2>
                        <p className="text-lg text-gray-600">
                            Building impactful solutions across diverse industries and technologies
                        </p>
                    </div>

                    <div className="space-y-8">
                        {experience.map((job, index) => (
                            <div key={index} className="relative pl-8 pb-8 border-l-2 border-blue-600 last:border-l-0 last:pb-0">
                                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-blue-600 font-medium">{job.company}</p>
                                        </div>
                                        <span className="text-sm text-gray-500 mt-2 md:mt-0">{job.period}</span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{job.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-blue-600">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        I&apos;m always interested in hearing about new opportunities and exciting projects.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <div className="flex items-center text-blue-100">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            jubayer.alam@example.com
                        </div>
                        <div className="flex items-center text-blue-100">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Dhaka, Bangladesh
                        </div>
                        <div className="flex items-center text-blue-100">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            github.com/jubayer98
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
