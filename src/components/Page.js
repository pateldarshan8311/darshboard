import React from 'react';
import WorkExperience from './WorkExperienceComponent';
import ProfileBox from './ProfileBox';
import { StatsComponent, CountersComponent } from './StatsComponent';
import StacksComponent from './StacksComponent';
import BasicDetailsComponent from './BasicDetailsComponent';
import ContactForm from './ContactForm';  // <-- naya import
import { motion } from 'framer-motion';
import '../css/MainContent.css';

const delayStep = 0.3;

// AnimatedBox wraps content with animation and required classes
const AnimatedBox = ({ children, index, className = '' }) => (
  <motion.div
    className={`comm_box_design comm_border_after d_flex ${className}`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * delayStep }}
  >
    {children}
  </motion.div>
);

const Page = ({ pageData }) => {
  if (!pageData) return <p>⚠ Page not found!</p>;

  const acf = pageData.acf || {};
  const basicDetails = acf.basic_details || acf;

  return (
    <div className="page-content">
      {/* Render WordPress content */}
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />

      {/* Animate sections only on About Me page */}
      {pageData.slug === 'about-me' && (
        <div className="comm_box_grid">
          {/* Profile Box */}
          <AnimatedBox index={0}>
            <ProfileBox acfData={acf} />
          </AnimatedBox>

          {/* Stats & Counters */}
          <AnimatedBox index={1}>
            <StatsComponent statsData={acf.statistics_items} />
            <CountersComponent countersData={acf.my_counters} />
          </AnimatedBox>

          {/* Stacks Section */}
          <AnimatedBox index={2} className="flex_column p_0">
            <StacksComponent stackData={acf} />
          </AnimatedBox>

          {/* Basic Details Section */}
          <AnimatedBox index={3} className="flex_column">
            <BasicDetailsComponent basicDetails={basicDetails} />
          </AnimatedBox>

          {/* Work Experience Section */}
          <AnimatedBox index={4} className="flex_column p_0">
            <WorkExperience data={acf} />
          </AnimatedBox>

          {/* Naya Contact Form Section */}
          <AnimatedBox index={5} className="flex_column p_0">
            <ContactForm />
          </AnimatedBox>
        </div>
      )}
    </div>
  );
};

export default Page;
