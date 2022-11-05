package play2win.techxel.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import play2win.techxel.com.web.rest.TestUtil;

class ReponseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reponse.class);
        Reponse reponse1 = new Reponse();
        reponse1.setId(1L);
        Reponse reponse2 = new Reponse();
        reponse2.setId(reponse1.getId());
        assertThat(reponse1).isEqualTo(reponse2);
        reponse2.setId(2L);
        assertThat(reponse1).isNotEqualTo(reponse2);
        reponse1.setId(null);
        assertThat(reponse1).isNotEqualTo(reponse2);
    }
}
