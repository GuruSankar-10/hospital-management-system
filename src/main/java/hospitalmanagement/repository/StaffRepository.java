package hospitalmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hospitalmanagement.entity.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

}