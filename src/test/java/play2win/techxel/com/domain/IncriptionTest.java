package play2win.techxel.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import play2win.techxel.com.web.rest.TestUtil;

class IncriptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Incription.class);
        Incription incription1 = new Incription();
        incription1.setId(1L);
        Incription incription2 = new Incription();
        incription2.setId(incription1.getId());
        assertThat(incription1).isEqualTo(incription2);
        incription2.setId(2L);
        assertThat(incription1).isNotEqualTo(incription2);
        incription1.setId(null);
        assertThat(incription1).isNotEqualTo(incription2);
    }
}
