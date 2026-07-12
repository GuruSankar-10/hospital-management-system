package hospitalmanagement.controller;


import hospitalmanagement.dto.DashboardResponse;
import hospitalmanagement.service.DashboardService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins="*")
public class DashboardController {



    @Autowired
    private DashboardService dashboardService;



    @GetMapping("/stats")
    public DashboardResponse getStats(){


        return dashboardService.getDashboardData();


    }



}