package AgendaMG.Crud.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Eventos")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "NomeEvento")
    private String nomeEvento;
    @Column(name="DescricaoDoEvento")
    private String descricaoDoEvento;
    @Column(name="DataDoEvento")
    private String dataDoEvento;
    @Column(name="LocalDoEvento")
    private String localDoEvento;
    @Column(name="PrecoDoEvento")
    private double precoDoEvento;
    @Column(name="CapacidadeDePessoasNoEvento")
    private int capacidadeDePessoasNoEvento;
    @Column(name="TipoDoEvento")
    private String tipoDoEvento;
    @Column(name = "ApresentadorDoEvento")
    private String apresentadorDoEvento;
    @Column(name="DuracaoDoEvento")
    private String duracaoDoEvento;
}
