package mutuelle_backend.repository;
import mutuelle_backend.entity.Adherent; import org.springframework.data.jpa.repository.*;
public interface AdherentRepository extends JpaRepository<Adherent, Long>, JpaSpecificationExecutor<Adherent> { boolean existsByMatriculeAndIdNot(String matricule, Long id); boolean existsByCinAndIdNot(String cin, Long id); }
