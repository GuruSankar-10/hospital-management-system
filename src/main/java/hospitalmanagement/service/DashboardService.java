package hospitalmanagement.service;


import hospitalmanagement.dto.DashboardResponse;
import hospitalmanagement.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class DashboardService {


    @Autowired
    private DoctorRepository doctorRepository;


    @Autowired
    private StaffRepository staffRepository;


    @Autowired
    private PatientRepository patientRepository;


    @Autowired
    private AppointmentRepository appointmentRepository;




    public DashboardResponse getDashboardData(){


        long doctors =
                doctorRepository.count();


        long staff =
                staffRepository.count();


        long patients =
                patientRepository.count();


        long appointments =
                appointmentRepository.count();



        return new DashboardResponse(
                doctors,
                staff,
                patients,
                appointments
        );


    }


}