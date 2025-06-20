import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Appointment interface - all types defined inline
interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentDemo: React.FC = ({userAppointments}) => {
  const router = useRouter()
  // AppointmentCard component function - merged inline
  const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
    const handleViewTicket = (id) => {
      router.push(`/tickets/${appointment.id}`);
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    const formatTime = (timeString: string) => {
      return timeString;
    };

    return (
      <Card className="w-auto max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-[#bd1818]" data-id="17n2w4eka" data-path="src/pages/AppointmentDemo.tsx">
        <CardContent className="p-6" data-id="rsz67k59z" data-path="src/pages/AppointmentDemo.tsx">
          <div className="space-y-4" data-id="rbug0kh8k" data-path="src/pages/AppointmentDemo.tsx">
            {/* Doctor Name and Specialty */}
            <div className="flex items-start space-x-3" data-id="pqs78s0q1" data-path="src/pages/AppointmentDemo.tsx">
              <div className="flex-shrink-0 w-10 h-10 bg-[#bd1818]/10 rounded-full flex items-center justify-center" data-id="cqltsmmqd" data-path="src/pages/AppointmentDemo.tsx">
                <Stethoscope className="w-5 h-5 text-[#bd1818]" data-id="keqpw2mm4" data-path="src/pages/AppointmentDemo.tsx" />
              </div>
              <div className="flex-1 min-w-0" data-id="9b3cq0hxy" data-path="src/pages/AppointmentDemo.tsx">
                <h3 className="text-lg font-semibold text-gray-900 truncate" data-id="dwx7r2d40" data-path="src/pages/AppointmentDemo.tsx">
                  Dr. {appointment.doctorName}
                </h3>
                <p className="text-sm text-gray-600" data-id="37xrb82qp" data-path="src/pages/AppointmentDemo.tsx">{appointment.specialty}</p>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-3" data-id="xq9cn1133" data-path="src/pages/AppointmentDemo.tsx">
              {/* Date */}
              <div className="flex items-center space-x-3" data-id="zlmel4qql" data-path="src/pages/AppointmentDemo.tsx">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center" data-id="psb7va3b9" data-path="src/pages/AppointmentDemo.tsx">
                  <Calendar className="w-4 h-4 text-gray-600" data-id="w26dtqswl" data-path="src/pages/AppointmentDemo.tsx" />
                </div>
                <div data-id="hum0k1bze" data-path="src/pages/AppointmentDemo.tsx">
                  <p className="text-sm font-medium text-gray-900" data-id="qsbqlz6x5" data-path="src/pages/AppointmentDemo.tsx">
                    {formatDate(appointment.appointmentDate)}
                  </p>
                  <p className="text-xs text-gray-500" data-id="v7166w3dg" data-path="src/pages/AppointmentDemo.tsx">Appointment Date</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center space-x-3" data-id="jxc4c5am0" data-path="src/pages/AppointmentDemo.tsx">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center" data-id="8me46zrjj" data-path="src/pages/AppointmentDemo.tsx">
                  <Clock className="w-4 h-4 text-gray-600" data-id="b510le2vg" data-path="src/pages/AppointmentDemo.tsx" />
                </div>
                <div data-id="kunhfgwqb" data-path="src/pages/AppointmentDemo.tsx">
                  <p className="text-sm font-medium text-gray-900" data-id="y4msre05p" data-path="src/pages/AppointmentDemo.tsx">
                    {formatTime(appointment.appointmentTime)}
                  </p>
                  <p className="text-xs text-gray-500" data-id="igoajxd8q" data-path="src/pages/AppointmentDemo.tsx">Appointment Time</p>
                </div>
              </div>

              {/* Appointment Type */}
              <div className="flex items-center space-x-3" data-id="cxid2yhhx" data-path="src/pages/AppointmentDemo.tsx">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center" data-id="falm63elg" data-path="src/pages/AppointmentDemo.tsx">
                  <User className="w-4 h-4 text-gray-600" data-id="0tr2q91lw" data-path="src/pages/AppointmentDemo.tsx" />
                </div>
                <div className="flex-1" data-id="7v9s51yg1" data-path="src/pages/AppointmentDemo.tsx">
                  <Badge
                    variant="secondary"
                    className="bg-[#bd1818]/10 text-[#bd1818] hover:bg-[#bd1818]/20" data-id="lw9ar2nwb" data-path="src/pages/AppointmentDemo.tsx">
                    {appointment.appointmentType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0" data-id="kaypinciu" data-path="src/pages/AppointmentDemo.tsx">
          <Button
            onClick={handleViewTicket}
            className="w-full bg-[#bd1818] hover:bg-[#a01515] text-white font-medium py-2.5 transition-colors duration-200" data-id="b84irwecy" data-path="src/pages/AppointmentDemo.tsx">
            View Ticket
          </Button>
        </CardFooter>
      </Card>);

  };

  // Sample appointment data - all props and appointments object here
  const sampleAppointments: Appointment[] = userAppointments;


  return (
    <div className="min-h-screen bg-gray-50 py-8" data-id="arnydjxsa" data-path="src/pages/AppointmentDemo.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="9187g47b4" data-path="src/pages/AppointmentDemo.tsx">
        <div className="text-center mb-8" data-id="yi958e6k1" data-path="src/pages/AppointmentDemo.tsx">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-id="4hctlbd66" data-path="src/pages/AppointmentDemo.tsx">
            Upcoming Appointments
          </h1>
          <p className="text-gray-600" data-id="o7k61f51h" data-path="src/pages/AppointmentDemo.tsx">
            View your scheduled medical appointments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="rw6gxh843" data-path="src/pages/AppointmentDemo.tsx">
          {sampleAppointments.map((appointment) =>
          <AppointmentCard
            key={appointment.id}
            appointment={appointment} data-id="zv3z63toy" data-path="src/pages/AppointmentDemo.tsx" />
          )}
        </div>
      </div>
    </div>);

};

export default AppointmentDemo;