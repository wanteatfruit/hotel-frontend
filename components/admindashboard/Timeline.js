import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function AdiminDashTimeline(){
    return(
        <Timeline position='left'>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant='outlined' />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>

                </TimelineContent>
            </TimelineItem>
        </Timeline>
    )
}