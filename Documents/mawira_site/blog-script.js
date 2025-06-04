document.addEventListener('DOMContentLoaded', () => {
    const postsListContainer = document.getElementById('posts-list-container');
    const categoriesList = document.getElementById('categories-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const blogMainArea = document.getElementById('blog-content'); // Container principal da listagem
    const postDetailSection = document.getElementById('post-detail-section');
    const backToBlogBtn = document.getElementById('back-to-blog-btn');
    const postDetailTitle = document.getElementById('post-detail-title');
    const postDetailMeta = document.getElementById('post-detail-meta');
    const postDetailContent = document.getElementById('post-detail-content');
    const commentForm = document.getElementById('comment-form');
    const commentText = document.getElementById('comment-text');
    const postRating = document.getElementById('post-rating');
    const commentsList = document.getElementById('comments-list');

    let allPosts = []; // Armazenará todos os posts carregados
    let currentFilterCategory = 'todos'; // Categoria ativa
    let currentSearchTerm = ''; // Termo de pesquisa ativo

    // Simulação de Dados de Posts (em um projeto real, isso viria de um backend/API)
    const mockPosts = [
        {
            id: 'hidracao-poderosa',
            title: 'Hidratação Poderosa: O Segredo para Cabelos Macios e Brilhantes',
            date: '2025-05-28',
            author: 'Equipe Mawira',
            image: 'images/blog/hidratacao-poderosa.jpg',
            category: ['cuidados', 'hidratacao'],
            summary: 'Descubra como a hidratação é crucial para a saúde capilar. Conheça os melhores produtos e técnicas para ter fios macios, sedosos e cheios de brilho.',
            content: `
                <p>A hidratação é o pilar de qualquer rotina de cuidados capilares eficaz. Ela repõe a água e os nutrientes essenciais que os fios perdem diariamente devido a fatores como sol, vento, poluição, uso de ferramentas de calor e químicas.</p>
                <h4>Por que hidratar o cabelo?</h4>
                <ul>
                    <li><strong>Maciez e Brilho:</strong> Fios hidratados refletem melhor a luz, tornando-os mais brilhantes. A água preenche a fibra capilar, deixando-a mais suave ao toque.</li>
                    <li><strong>Flexibilidade:</strong> Cabelos bem hidratados são mais flexíveis e menos propensos a quebrar.</li>
                    <li><strong>Redução de Frizz:</strong> A hidratação ajuda a selar as cutículas, evitando que os fios absorvam a umidade do ar e fiquem arrepiados.</li>
                    <li><strong>Melhora na Penteabilidade:</strong> Fios macios e desembaraçados são mais fáceis de pentear, reduzindo a quebra.</li>
                </ul>
                <img src="images/blog/hidratacao-beneficios.jpg" alt="Benefícios da Hidratação">
                <h4>Os Melhores Ativos Hidratantes</h4>
                <p>Procure por máscaras e condicionadores que contenham ingredientes como:</p>
                <ul>
                    <li><strong>Ácido Hialurônico:</strong> Capaz de reter grande quantidade de água.</li>
                    <li><strong>Pantenol (Vitamina B5):</strong> Proporciona hidratação profunda e duradoura.</li>
                    <li><strong>Extratos de Algas:</strong> Ricos em minerais e oligoelementos que hidratam e fortalecem.</li>
                    <li><strong>Glicerina Vegetal:</strong> Atrai e retém a umidade nos fios.</li>
                    <li><strong>Aloe Vera (Babosa):</strong> Reconhecida por suas propriedades hidratantes e calmantes.</li>
                </ul>
                <p>Para uma hidratação potente, aplique a máscara nos cabelos limpos e úmidos, mecha por mecha, enluvando bem. Deixe agir pelo tempo indicado na embalagem e enxágue completamente.</p>
                <p>Na Mawira, temos uma linha completa de produtos formulados com os melhores ativos hidratantes para transformar seus cabelos. Experimente e sinta a diferença!</p>
            `
        },
        {
            id: 'cronograma-capilar-para-iniciantes',
            title: 'Cronograma Capilar para Iniciantes: Guia Completo',
            date: '2025-05-20',
            author: 'Equipe Mawira',
            image: 'images/blog/cronograma-capilar.jpg',
            category: ['cuidados', 'hidratacao', 'nutricao', 'reconstrucao'],
            summary: 'Aprenda o que é e como montar um cronograma capilar personalizado para as necessidades do seu cabelo, recuperando a saúde e o brilho dos fios.',
            content: `
                <p>O cronograma capilar é uma rotina de cuidados com os cabelos que intercala três tratamentos principais: Hidratação, Nutrição e Reconstrução. Cada etapa oferece um benefício específico e, juntas, elas restauram a saúde e a vitalidade dos fios.</p>
                <h4>Entenda as Etapas:</h4>
                <ol>
                    <li><strong>Hidratação:</strong> Repõe a água dos fios, essencial para maciez e brilho. Ideal para cabelos secos, opacos ou com frizz.</li>
                    <li><strong>Nutrição:</strong> Repõe os lipídios (óleos) dos fios, combatendo o ressecamento e o frizz. Essencial para cabelos com pontas duplas, sem brilho e porosos.</li>
                    <li><strong>Reconstrução:</strong> Repõe as proteínas (principalmente a queratina) da fibra capilar, fortalecendo os fios. Essencial para cabelos danificados por químicas, elásticos, quebradiços ou finos.</li>
                </ol>
                <img src="images/blog/cronograma-etapas.jpg" alt="Etapas do Cronograma Capilar">
                <h4>Como Montar Seu Cronograma:</h4>
                <p>A frequência e a ordem das etapas dependem da necessidade do seu cabelo. Um cronograma básico semanal pode ser:</p>
                <ul>
                    <li><strong>Cabelos Saudáveis:</strong> Hidratação - Nutrição - Hidratação</li>
                    <li><strong>Cabelos Ressecados/Quimicamente Tratados:</strong> Hidratação - Nutrição - Reconstrução (a cada 15 dias)</li>
                    <li><strong>Cabelos Muito Danificados:</strong> Nutrição - Hidratação - Reconstrução</li>
                </ul>
                <p>Lembre-se de adaptar e observar como seu cabelo reage a cada tratamento. A Mawira oferece produtos específicos para cada fase do seu cronograma, facilitando a sua jornada por cabelos incríveis!</p>
            `
        },
        {
            id: 'receitas-mascaras-naturais',
            title: 'Receitas Caseiras de Máscaras Naturais para Cabelos Incríveis',
            date: '2025-05-15',
            author: 'Equipe Mawira',
            image: 'images/blog/mascaras-naturais.jpg',
            category: ['receitas-caseiras', 'hidratacao', 'nutricao'],
            summary: 'Descubra receitas simples e eficazes de máscaras capilares com ingredientes que você tem em casa para hidratar e nutrir seus fios de forma natural.',
            content: `
                <p>As máscaras capilares caseiras são uma ótima opção para quem busca tratamentos naturais e econômicos. Com ingredientes simples da sua cozinha, é possível criar máscaras poderosas para hidratar, nutrir e fortalecer seus cabelos.</p>
                <h4>Máscara de Abacate e Azeite (Nutrição Profunda):</h4>
                <ul>
                    <li>1/2 abacate maduro</li>
                    <li>1 colher de sopa de azeite de oliva extra virgem</li>
                    <li>1 colher de sopa de mel (opcional)</li>
                </ul>
                <p>Amasse o abacate e misture com o azeite (e o mel, se usar) até obter uma pasta homogênea. Aplique nos cabelos limpos e úmidos, do comprimento às pontas. Deixe agir por 30 minutos e enxágue bem.</p>
                <img src="images/blog/abacate-azeite.jpg" alt="Máscara de Abacate e Azeite">
                <h4>Máscara de Banana e Leite (Hidratação e Brilho):</h4>
                <ul>
                    <li>1 banana madura</li>
                    <li>2 colheres de sopa de leite integral</li>
                    <li>1 colher de chá de óleo de coco (opcional)</li>
                </ul>
                <p>Amasse bem a banana até não ter pedacinhos (pode usar um mixer). Misture com o leite e o óleo de coco. Aplique nos cabelos limpos e úmidos, deixe agir por 20-30 minutos e enxágue. O leite ajuda a dar brilho e a banana hidrata.</p>
                <p>Lembre-se de sempre testar em uma pequena área antes de aplicar em todo o cabelo e de enxaguar muito bem para não deixar resíduos.</p>
            `
        },
        {
            id: 'transicao-capilar-dicas',
            title: 'Transição Capilar: Dicas para Passar pela Fase com Sucesso',
            date: '2025-05-10',
            author: 'Equipe Mawira',
            image: 'images/blog/transicao-capilar.jpg',
            category: ['transicao-capilar'],
            summary: 'Está passando pela transição capilar? Confira dicas essenciais para lidar com as duas texturas, manter a saúde dos fios e aceitar seu cabelo natural.',
            content: `
                <p>A transição capilar é o processo de deixar de usar químicas alisantes para assumir a textura natural do cabelo. É uma jornada de autoconhecimento e aceitação, que pode ser desafiadora, mas muito gratificante.</p>
                <h4>Principais Desafios:</h4>
                <ul>
                    <li><strong>Duas Texturas:</strong> A parte com química e a parte natural terão texturas diferentes, o que pode dificultar a finalização e o aspecto visual.</li>
                    <li><strong>Quebra e Ressecamento:</strong> A junção das texturas é um ponto frágil, suscetível à quebra. A parte quimicamente tratada também pode estar mais ressecada.</li>
                    <li><strong>Paciência:</strong> O cabelo cresce cerca de 1 a 1,5 cm por mês, então a transição leva tempo.</li>
                </ul>
                <img src="images/blog/transicao-duas-texturas.jpg" alt="Duas texturas na transição capilar">
                <h4>Dicas para uma Transição Suave:</h4>
                <ol>
                    <li><strong>Hidrate e Nutra Muito:</strong> Cabelos em transição precisam de um cronograma capilar intenso para minimizar a diferença de textura e fortalecer os fios.</li>
                    <li><strong>Texturização:</strong> Use técnicas como fitagem, coquinhos, bigudinhos ou tranças para tentar uniformizar as duas texturas.</li>
                    <li><strong>Corte Estratégico:</strong> O "Big Chop" (corte radical) remove toda a parte com química de uma vez. Se não quiser cortar tudo, faça cortes graduais para remover a parte alisada aos poucos.</li>
                    <li><strong>Finalizadores Específicos:</strong> Cremes para pentear, géis e mousses para definição ajudam a manter os cachos/ondas no lugar.</li>
                    <li><strong>Aceitação e Amor Próprio:</strong> Celebre cada centímetro do seu cabelo natural. Encontre inspirações e faça parte de comunidades que apoiam a transição.</li>
                </ol>
                <p>A Mawira oferece produtos que auxiliam na transição, com foco em hidratação, nutrição e fortalecimento para que seus fios naturais cresçam saudáveis e definidos.</p>
            `
        },
        {
            id: 'problemas-queda-cabelo',
            title: 'Queda de Cabelo: Causas Comuns e Como Minimizar',
            date: '2025-05-01',
            author: 'Equipe Mawira',
            image: 'images/blog/queda-cabelo-blog.jpg',
            category: ['problemas-capilares', 'queda'],
            summary: 'A queda de cabelo pode ser preocupante. Entenda as principais causas e descubra como uma rotina de cuidados adequada e tratamentos podem ajudar a minimizar o problema.',
            content: `
                <p>É normal perder cerca de 50 a 100 fios de cabelo por dia. No entanto, se você notar uma queda excessiva, mechas mais finas ou falhas, pode ser um sinal de que algo não vai bem. A queda capilar pode ter diversas causas, desde fatores genéticos até estresse e má alimentação.</p>
                <h4>Causas Comuns da Queda:</h4>
                <ul>
                    <li><strong>Estresse e Ansiedade:</strong> Períodos de alto estresse podem levar à queda temporária.</li>
                    <li><strong>Deficiências Nutricionais:</strong> Falta de vitaminas (como B12, D) e minerais (ferro, zinco) afeta a saúde do folículo.</li>
                    <li><strong>Alterações Hormonais:</strong> Gravidez, pós-parto, menopausa, problemas de tireoide podem influenciar.</li>
                    <li><strong>Genética:</strong> A alopecia androgenética (calvície hereditária) é comum em homens e mulheres.</li>
                    <li><strong>Doenças do Couro Cabeludo:</strong> Fungos, inflamações ou dermatite seborreica.</li>
                    <li><strong>Uso Excessivo de Química e Calor:</strong> Danifica a fibra capilar e o folículo.</li>
                </ul>
                <img src="images/blog/couro-cabeludo-saudavel.jpg" alt="Couro cabeludo saudável">
                <h4>Como Minimizar a Queda:</h4>
                <ol>
                    <li><strong>Alimentação Balanceada:</strong> Consuma alimentos ricos em proteínas, vitaminas e minerais.</li>
                    <li><strong>Gerenciamento do Estresse:</strong> Pratique atividades relaxantes, como yoga ou meditação.</li>
                    <li><strong>Produtos Específicos:</strong> Use shampoos e tônicos fortalecedores com ativos como cafeína, biotina, extratos botânicos.</li>
                    <li><strong>Massagem no Couro Cabeludo:</strong> Estimula a circulação sanguínea na região.</li>
                    <li><strong>Evite Excesso de Calor e Química:</strong> Diminua o uso de secador, chapinha e químicas agressivas.</li>
                    <li><strong>Consulte um Especialista:</strong> Se a queda persistir, um dermatologista poderá diagnosticar a causa e indicar o tratamento adequado.</li>
                </ol>
                <p>Na Mawira, temos produtos formulados para fortalecer os fios e reduzir a queda, auxiliando na saúde do couro cabeludo e estimulando o crescimento. Consulte nossa linha de tratamento antiqueda!</p>
            `
        },
        {
            id: 'beneficios-oleos-vegetais',
            title: 'Os Benefícios Incríveis dos Óleos Vegetais para o Cabelo',
            date: '2025-04-25',
            author: 'Equipe Mawira',
            image: 'images/blog/oleos-vegetais.jpg',
            category: ['cuidados', 'nutricao'],
            summary: 'Explore o mundo dos óleos vegetais e descubra como eles podem nutrir profundamente, fortalecer e dar brilho aos seus cabelos de forma natural e eficaz.',
            content: `
                <p>Os óleos vegetais são verdadeiros elixires para os cabelos, repletos de vitaminas, minerais e ácidos graxos essenciais que proporcionam nutrição profunda. Eles são ideais para combater o ressecamento, o frizz e as pontas duplas, além de promover um brilho intenso.</p>
                <h4>Óleos Essenciais e Seus Benefícios:</h4>
                <ul>
                    <li><strong>Óleo de Coco:</strong> Altamente nutritivo, penetra na fibra capilar, reduzindo a perda de proteínas e prevenindo danos. Ideal para umectação.</li>
                    <li><strong>Óleo de Rícino:</strong> Conhecido por estimular o crescimento capilar e fortalecer os fios, combatendo a quebra.</li>
                    <li><strong>Óleo de Argan:</strong> Rico em vitamina E e antioxidantes, oferece brilho, maciez e proteção contra danos.</li>
                    <li><strong>Óleo de Jojoba:</strong> Regula a oleosidade do couro cabeludo e hidrata sem pesar, sendo ótimo para todos os tipos de cabelo.</li>
                    <li><strong>Óleo de Abacate:</strong> Altamente emoliente, nutre profundamente cabelos secos e danificados, oferecendo umectação intensa.</li>
                </ul>
                <img src="images/blog/umectacao-cabelo.jpg" alt="Umectação com óleo vegetal">
                <h4>Como Usar Óleos Vegetais no Cabelo:</h4>
                <ol>
                    <li><strong>Umectação:</strong> Aplique o óleo puro no cabelo seco (sujo ou limpo), deixe agir por pelo menos 30 minutos (ou durma com ele), e depois lave normalmente.</li>
                    <li><strong>Adicionar à Máscara:</strong> Misture algumas gotas do seu óleo favorito à sua máscara de tratamento para potencializar a nutrição.</li>
                    <li><strong>Finalizador:</strong> Use uma pequena quantidade de óleo nas pontas secas para selar, dar brilho e controlar o frizz.</li>
                </ol>
                <p>A Mawira incorpora óleos vegetais de alta qualidade em muitos de seus produtos, garantindo que você receba todos os benefícios da natureza para um cabelo deslumbrante.</p>
            `
        },
        {
            id: 'cuidados-cabelos-coloridos',
            title: 'Cuidados Essenciais para Cabelos Coloridos e Descoloridos',
            date: '2025-04-18',
            author: 'Equipe Mawira',
            image: 'images/blog/cabelo-colorido.jpg',
            category: ['cuidados', 'reconstrucao'],
            summary: 'Manter a cor vibrante e a saúde dos cabelos após a coloração ou descoloração exige cuidados específicos. Aprenda as melhores práticas para prolongar a cor e proteger seus fios.',
            content: `
                <p>Colorir ou descolorir os cabelos pode transformá-los e realçar sua beleza, mas também os deixa mais sensíveis e propensos a danos. Para garantir que sua cor dure mais e seus fios permaneçam saudáveis, uma rotina de cuidados específicos é fundamental.</p>
                <h4>Desafios dos Cabelos Quimicamente Tratados:</h4>
                <ul>
                    <li><strong>Desbotamento:</strong> A cor pode desbotar rapidamente sem os produtos certos.</li>
                    <li><strong>Ressecamento:</strong> A química pode remover a umidade natural dos fios.</li>
                    <li><strong>Quebra e Elasticidade:</strong> Cabelos descoloridos, em particular, ficam mais frágeis.</li>
                </ul>
                <img src="images/blog/cabelo-descolorido-cuidado.jpg" alt="Cabelo descolorido precisando de cuidado">
                <h4>Rotina de Cuidados:</h4>
                <ol>
                    <li><strong>Shampoo e Condicionador Específicos:</strong> Use produtos para cabelos coloridos, que ajudam a selar as cutículas e preservar a cor. Shampoos sem sulfato são uma ótima opção.</li>
                    <li><strong>Hidratação e Nutrição Intensas:</strong> Adicione máscaras hidratantes e nutritivas ao seu cronograma capilar para repor a água e os lipídios perdidos.</li>
                    <li><strong>Reconstrução Regular:</strong> Cabelos danificados por química se beneficiam muito da reconstrução (com queratina ou proteínas) para fortalecer a fibra capilar.</li>
                    <li><strong>Protetor Térmico e Solar:</strong> Sempre use protetor térmico antes do secador, chapinha ou babyliss. O sol também pode desbotar a cor, então invista em produtos com filtro UV.</li>
                    <li><strong>Lave com Água Morna/Fria:</strong> Água muito quente abre as cutículas e facilita o desbotamento.</li>
                    <li><strong>Retoque da Raiz:</strong> Evite retocar o comprimento do cabelo com frequência para não saturar os fios com química desnecessariamente.</li>
                </ol>
                <p>A linha de produtos da Mawira para cabelos quimicamente tratados foi desenvolvida para prolongar a vida da sua cor, restaurar a saúde e o brilho dos seus fios, oferecendo proteção e reparação.</p>
            `
        },
        {
            id: 'mitos-verdades-cabelo',
            title: 'Mitos e Verdades sobre Cuidados com o Cabelo',
            date: '2025-04-10',
            author: 'Equipe Mawira',
            image: 'images/blog/mitos-verdades.jpg',
            category: ['cuidados'],
            summary: 'Desmistifique algumas crenças populares sobre cuidados capilares e descubra o que realmente funciona para manter seus cabelos saudáveis e bonitos.',
            content: `
                <p>O universo dos cuidados capilares está cheio de informações, mas nem tudo que se ouve por aí é verdade. Vamos desvendar alguns mitos e confirmar algumas verdades para você cuidar do seu cabelo da melhor forma possível!</p>
                <h4>Mitos:</h4>
                <ul>
                    <li><strong>"Cortar o cabelo faz ele crescer mais rápido":</strong> Mito. Cortar as pontas remove as partes danificadas e estimula um crescimento mais saudável, mas não acelera o processo em si. O crescimento vem do folículo.</li>
                    <li><strong>"Arrancar um fio branco faz nascer mais":</strong> Mito. Arrancar o fio não altera a produção de melanina nos folículos vizinhos. No máximo, você pode irritar o couro cabeludo.</li>
                    <li><strong>"Lavar o cabelo todo dia faz mal":</strong> Mito. A frequência de lavagem depende do seu tipo de cabelo e estilo de vida. Cabelos oleosos, por exemplo, se beneficiam da lavagem diária. O importante é usar produtos adequados e lavar corretamente.</li>
                </ul>
                <img src="images/blog/duvidas-cabelo.jpg" alt="Perguntas e dúvidas sobre cabelo">
                <h4>Verdades:</h4>
                <ul>
                    <li><strong>"Protetor térmico é essencial":</strong> Verdade. Ferramentas de calor danificam os fios. O protetor térmico cria uma barreira que minimiza esses danos.</li>
                    <li><strong>"Massagear o couro cabeludo estimula o crescimento":</strong> Verdade. A massagem aumenta a circulação sanguínea na região, o que leva mais nutrientes aos folículos e pode, sim, auxiliar no crescimento.</li>
                    <li><strong>"Água quente resseca o cabelo":</strong> Verdade. Água muito quente remove a oleosidade natural do couro cabeludo e abre as cutículas dos fios, tornando-os mais secos e suscetíveis ao frizz. Prefira água morna ou fria.</li>
                </ul>
                <p>Conhecer seu cabelo e as informações corretas é o primeiro passo para uma rotina de cuidados eficaz. Na Mawira, estamos sempre buscando trazer conhecimento e produtos de qualidade para você!</p>
            `
        },
        {
            id: 'rotina-cabelos-oleosos',
            title: 'Rotina de Cuidados para Cabelos Oleosos: Diga Adeus à Oleosidade!',
            date: '2025-03-20',
            author: 'Equipe Mawira',
            image: 'images/blog/cabelo-oleoso.jpg',
            category: ['cuidados', 'problemas-capilares', 'oleosidade'],
            summary: 'Sofre com a oleosidade excessiva? Descubra a rotina de cuidados ideal, produtos e dicas para controlar o excesso de sebo e manter seus cabelos limpos e leves por mais tempo.',
            content: `
                <p>Cabelos oleosos são um desafio comum, caracterizados pelo excesso de produção de sebo no couro cabeludo, o que pode deixar os fios com aspecto pesado, sujo e sem vida. No entanto, com a rotina de cuidados certa e os produtos adequados, é possível controlar a oleosidade e ter cabelos frescos e soltos.</p>
                <h4>O que Causa a Oleosidade?</h4>
                <ul>
                    <li><strong>Genética:</strong> A predisposição é um fator importante.</li>
                    <li><strong>Hormônios:</strong> Alterações hormonais podem influenciar a produção de sebo.</li>
                    <li><strong>Alimentação:</strong> Dietas ricas em gordura e açúcar podem contribuir.</li>
                    <li><strong>Lavagem Inadequada:</strong> Usar água muito quente ou massagear o couro cabeludo em excesso pode estimular as glândulas sebáceas.</li>
                    <li><strong>Produtos Inadequados:</strong> Condicionadores e máscaras muito pesadas ou aplicadas na raiz.</li>
                </ul>
                <img src="images/blog/couro-cabeludo-oleoso.jpg" alt="Couro cabeludo oleoso">
                <h4>Rotina de Cuidados Essenciais:</h4>
                <ol>
                    <li><strong>Shampoo para Cabelos Oleosos:</strong> Invista em shampoos com ingredientes como menta, chá verde, alecrim ou argila, que ajudam a controlar a oleosidade e purificar o couro cabeludo. Lave com frequência necessária.</li>
                    <li><strong>Condicionador Apenas nas Pontas:</strong> Nunca aplique condicionador na raiz. Concentre-se no comprimento e nas pontas para evitar pesar o cabelo.</li>
                    <li><strong>Máscaras de Argila ou Carvão Ativado:</strong> Uma vez por semana, use máscaras desintoxicantes no couro cabeludo e comprimento para absorver o excesso de óleo e impurezas.</li>
                    <li><strong>Água Morna/Fria:</strong> Lave o cabelo com água morna para fria. Água quente estimula a produção de sebo.</li>
                    <li><strong>Evite Excesso de Toque:</strong> Tocar o cabelo ou passar as mãos constantemente leva oleosidade das mãos para os fios.</li>
                    <li><strong>Limpeza a Seco (se necessário):</strong> Shampoos a seco podem ser aliados para emergências, mas não substituem a lavagem.</li>
                </ol>
                <p>A Mawira tem uma linha de produtos desenvolvida para equilibrar a oleosidade do couro cabeludo, proporcionando frescor e leveza sem ressecar as pontas. Descubra a solução ideal para você!</p>
            `
        },
        {
            id: 'receita-tonico-crescimento',
            title: 'Receita Caseira de Tônico Capilar para Estimular o Crescimento',
            date: '2025-03-10',
            author: 'Equipe Mawira',
            image: 'images/blog/tonico-crescimento.jpg',
            category: ['receitas-caseiras', 'crescimento'],
            summary: 'Quer estimular o crescimento capilar de forma natural? Aprenda a fazer um tônico caseiro potente com ingredientes simples que fortalecem os fios e ativam o folículo.',
            content: `
                <p>Se você busca um boost no crescimento dos seus fios e quer fortalecê-los de forma natural, os tônicos capilares caseiros são excelentes aliados. Eles usam ingredientes com propriedades comprovadas para estimular o couro cabeludo e nutrir os folículos.</p>
                <h4>Tônico de Alecrim e Gengibre:</h4>
                <p>O alecrim é conhecido por estimular a circulação no couro cabeludo, enquanto o gengibre tem propriedades anti-inflamatórias e também ajuda no crescimento.</p>
                <ul>
                    <li>1 xícara de água filtrada</li>
                    <li>2 colheres de sopa de alecrim fresco (ou 1 colher de sopa de seco)</li>
                    <li>1 pedaço pequeno de gengibre (cerca de 2-3 cm), descascado e fatiado</li>
                </ul>
                <p>Ferva a água. Quando começar a borbulhar, adicione o alecrim e o gengibre. Desligue o fogo, tampe e deixe em infusão até esfriar completamente. Coe o líquido e transfira para um borrifador.</p>
                <img src="images/blog/alecrim-gengibre.jpg" alt="Alecrim e Gengibre">
                <h4>Como Usar:</h4>
                <p>Borrife o tônico diretamente no couro cabeludo limpo e úmido (após a lavagem) ou seco. Massageie suavemente com as pontas dos dedos por alguns minutos para ativar a circulação. Não precisa enxaguar. Use 2-3 vezes por semana. Guarde na geladeira por até uma semana.</p>
                <p>Lembre-se que resultados levam tempo e constância. Para potencializar o efeito, combine com uma alimentação saudável e evite o estresse excessivo. Na Mawira, temos produtos que complementam seu tratamento natural, focando no fortalecimento e crescimento capilar.</p>
            `
        },
        {
            id: 'dermatite-seborreica-dicas',
            title: 'Dermatite Seborreica no Couro Cabeludo: Alívio e Cuidados',
            date: '2025-03-01',
            author: 'Equipe Mawira',
            image: 'images/blog/dermatite-seborreica.jpg',
            category: ['problemas-capilares', 'caspa'],
            summary: 'A dermatite seborreica (caspa) é um problema comum. Entenda suas causas e como aliviar os sintomas com uma rotina de cuidados adequada e produtos específicos.',
            content: `
                <p>A dermatite seborreica, conhecida popularmente como caspa ou seborreia, é uma condição inflamatória crônica da pele que afeta principalmente o couro cabeludo. Ela se manifesta com vermelhidão, descamação (flocos brancos ou amarelados) e coceira, podendo ser desconfortável e constrangedora.</p>
                <h4>Causas e Fatores Agravantes:</h4>
                <ul>
                    <li><strong>Fungo Malassezia:</strong> Presente naturalmente na pele, mas que se prolifera em excesso em certas condições.</li>
                    <li><strong>Produção de Sebo:</strong> Excesso de oleosidade no couro cabeludo cria um ambiente propício para o fungo.</li>
                    <li><strong>Estresse e Ansiedade:</strong> Podem desencadear ou agravar os surtos.</li>
                    <li><strong>Alterações Hormonais:</strong> Flutuações podem influenciar a oleosidade.</li>
                    <li><strong>Clima:</strong> Temperaturas extremas, tanto muito frio quanto muito quente, podem piorar.</li>
                    <li><strong>Uso Inadequado de Produtos:</strong> Resíduos de produtos ou shampoos inadequados.</li>
                </ul>
                <img src="images/blog/caspa-couro.jpg" alt="Caspa no couro cabeludo">
                <h4>Como Controlar e Aliviar:</h4>
                <ol>
                    <li><strong>Shampoo Anticaspa Específico:</strong> Use shampoos com ativos como Piritionato de Zinco, Sulfeto de Selênio, Cetoconazol ou Ácido Salicílico. Alterne com um shampoo suave.</li>
                    <li><strong>Lave Regularmente:</strong> Não evite lavar o cabelo. A lavagem ajuda a remover o excesso de sebo e as escamas.</li>
                    <li><strong>Evite Água Quente:</strong> Lave o cabelo com água morna ou fria para não estimular a oleosidade.</li>
                    <li><strong>Enxágue Bem:</strong> Certifique-se de remover todo o resíduo de shampoo e condicionador.</li>
                    <li><strong>Não Coce:</strong> Coçar pode irritar ainda mais o couro cabeludo e agravar a inflamação.</li>
                    <li><strong>Gerenciamento do Estresse:</strong> Técnicas de relaxamento podem ajudar a controlar os surtos.</li>
                    <li><strong>Consulte um Dermatologista:</strong> Se os sintomas forem persistentes ou graves, um médico poderá indicar tratamentos mais específicos.</li>
                </ol>
                <p>A Mawira oferece shampoos e tratamentos que podem auxiliar no controle da oleosidade e dos sintomas da dermatite seborreica, proporcionando alívio e bem-estar para o seu couro cabeludo.</p>
            `
        },
        {
            id: 'rotina-cabelos-crespos',
            title: 'Rotina de Cuidados para Cabelos Crespos: Definição e Saúde',
            date: '2025-02-20',
            author: 'Equipe Mawira',
            image: 'images/blog/cabelo-crespo.jpg',
            category: ['cuidados', 'definicao'],
            summary: 'Cabelos crespos são únicos e precisam de cuidados específicos para manter a definição, hidratação e saúde. Descubra a rotina ideal para seus cachos em formato Z.',
            content: `
                <p>Os cabelos crespos, com sua estrutura em forma de "Z" e curvatura apertada, são naturalmente mais secos nas pontas e propensos ao encolhimento. Sua beleza é inegável, mas exigem uma rotina de cuidados especial para manter a hidratação, a definição e evitar a quebra.</p>
                <h4>Características dos Cabelos Crespos:</h4>
                <ul>
                    <li><strong>Secura:</strong> A oleosidade natural do couro cabeludo tem dificuldade de chegar às pontas devido à curvatura.</li>
                    <li><strong>Encolhimento (Fator Encolhimento):</strong> O cabelo crespo parece menor quando seco do que quando molhado.</li>
                    <li><strong>Fragilidade:</strong> A estrutura em "Z" torna os fios mais suscetíveis à quebra, especialmente durante a manipulação.</li>
                    <li><strong>Definição:</strong> Podem precisar de mais estímulo para que os cachos se definam.</li>
                </ul>
                <img src="images/blog/cabelo-crespo-natural.jpg" alt="Cabelo crespo natural definido">
                <h4>Rotina de Cuidados Essenciais:</h4>
                <ol>
                    <li><strong>Umectação:</strong> Faça umectação com óleos vegetais puros (como coco, rícino, azeite) antes da lavagem. Isso nutre e protege os fios.</li>
                    <li><strong>Pré-poo:</strong> Aplique condicionador ou máscara nas pontas antes do shampoo para proteger da limpeza excessiva.</li>
                    <li><strong>Shampoo Suave e Hidratante:</strong> Prefira shampoos sem sulfato ou com pouca espuma para não ressecar. Lave com água morna para fria.</li>
                    <li><strong>Condicionador e Máscara Hidratante/Nutritiva:</strong> Essenciais após o shampoo. Use máscaras ricas em óleos, manteigas vegetais e agentes hidratantes.</li>
                    <li><strong>Desembaraçar com Cuidado:</strong> Desembarace o cabelo molhado e com condicionador/máscara, usando os dedos ou um pente de dentes largos, sempre de baixo para cima.</li>
                    <li><strong>Finalização para Definição:</strong> Use cremes de pentear, leave-ins e géis específicos para cabelos crespos, aplicando em mechas pequenas para definir. Técnica de fitagem é ótima!</li>
                    <li><strong>Secagem:</strong> Prefira secar naturalmente ou com difusor em temperatura baixa/média para evitar frizz e ressecamento.</li>
                    <li><strong>Proteção Noturna:</strong> Use uma touca de cetim ou fronha de cetim para proteger os cachos durante o sono.</li>
                </ol>
                <p>A Mawira tem uma linha completa de produtos pensados para as necessidades dos cabelos crespos, proporcionando hidratação, nutrição, força e uma definição impecável. Descubra sua melhor versão com a gente!</p>
            `
        }
    ];

    // --- Funções de Exibição ---

    // Renderiza os cards de posts
    function renderPosts(postsToRender) {
        postsListContainer.innerHTML = ''; // Limpa antes de renderizar
        if (postsToRender.length === 0) {
            postsListContainer.innerHTML = '<p class="no-results">Nenhum post encontrado para esta pesquisa ou categoria.</p>';
            return;
        }

        postsToRender.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.innerHTML = `
                <div class="post-card-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-card-content">
                    <h3>${post.title}</h3>
                    <p class="post-card-meta">Por ${post.author} em ${new Date(post.date).toLocaleDateString('pt-BR')}</p>
                    <p class="post-card-summary">${post.summary}</p>
                    <button class="btn-read-more" data-post-id="${post.id}">Leia mais</button>
                </div>
            `;
            postsListContainer.appendChild(postCard);

            postCard.querySelector('.btn-read-more').addEventListener('click', () => showPostDetail(post.id));
        });
    }

    // Exibe a página de detalhes de um post específico
    function showPostDetail(postId) {
        const post = allPosts.find(p => p.id === postId);
        if (!post) {
            console.error('Post não encontrado:', postId);
            return;
        }

        // Preenche os detalhes do post
        postDetailTitle.textContent = post.title;
        postDetailMeta.textContent = `Por ${post.author} em ${new Date(post.date).toLocaleDateString('pt-BR')} | Categoria: ${post.category.join(', ').replace(/-/g, ' ')}`;
        postDetailContent.innerHTML = post.content; // Use innerHTML para renderizar o HTML do conteúdo

        // Esconde a listagem e mostra os detalhes
        blogMainArea.style.display = 'none';
        postDetailSection.style.display = 'block';

        // Rolagem para o topo da página de detalhes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Volta para a listagem de posts
    backToBlogBtn.addEventListener('click', () => {
        blogMainArea.style.display = 'flex'; // Volta a exibir como flexbox
        postDetailSection.style.display = 'none';
        applyFiltersAndSearch(); // Recarrega os posts com os filtros ativos
    });

    // --- Funções de Filtro e Busca ---

    function applyFiltersAndSearch() {
        let filteredPosts = allPosts;

        // 1. Filtrar por categoria
        if (currentFilterCategory !== 'todos') {
            // Filtrar posts que contêm a categoria ativa
            filteredPosts = filteredPosts.filter(post => post.category.includes(currentFilterCategory));
        }

        // 2. Filtrar por termo de pesquisa (no título ou resumo)
        if (currentSearchTerm) {
            const searchTermLower = currentSearchTerm.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTermLower) ||
                post.summary.toLowerCase().includes(searchTermLower) ||
                post.content.toLowerCase().includes(searchTermLower) // Opcional: buscar no conteúdo completo
            );
        }

        renderPosts(filteredPosts);
    }

    // Event Listeners para Categorias
    categoriesList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('category-item')) {
            // Remove 'active' da categoria anterior
            categoriesList.querySelectorAll('.category-item').forEach(item => {
                item.classList.remove('active');
            });
            // Adiciona 'active' à categoria clicada
            target.classList.add('active');

            currentFilterCategory = target.dataset.category;
            applyFiltersAndSearch(); // Aplica o novo filtro
        }
    });

    // Event Listeners para Pesquisa
    searchButton.addEventListener('click', () => {
        currentSearchTerm = searchInput.value.trim();
        applyFiltersAndSearch();
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            currentSearchTerm = searchInput.value.trim();
            applyFiltersAndSearch();
        }
    });

    // --- Comentários e Avaliação (simulação) ---
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const comment = commentText.value.trim();
        const rating = postRating.value;

        if (comment && rating) {
            const newCommentDiv = document.createElement('div');
            newCommentDiv.classList.add('comment-item');
            const now = new Date();
            const formattedDate = now.toLocaleDateString('pt-BR');
            const formattedTime = now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});

            // Simula um nome de usuário (em um sistema real, viria do usuário logado)
            const userName = "Visitante"; // Ou um nome de usuário real

            newCommentDiv.innerHTML = `
                <p class="comment-author"><strong>${userName}</strong> em ${formattedDate} às ${formattedTime}</p>
                <p>Avaliação: ${'★'.repeat(parseInt(rating))} (${rating}/5)</p>
                <p>${comment}</p>
            `;
            commentsList.prepend(newCommentDiv); // Adiciona o novo comentário no topo

            commentText.value = ''; // Limpa o campo de texto
            postRating.value = ''; // Limpa a seleção de avaliação
            alert('Comentário enviado com sucesso!');
        } else {
            alert('Por favor, escreva um comentário e selecione uma avaliação.');
        }
    });


    // --- Inicialização ---
    // Carrega os posts simulados e os renderiza
    allPosts = mockPosts.map(post => {
        // Formata a data para um objeto Date para manipulação futura se necessário
        return { ...post, date: new Date(post.date) };
    }).sort((a, b) => b.date - a.date); // Ordena os posts pelo mais recente

    applyFiltersAndSearch(); // Renderiza todos os posts inicialmente

    // Lógica do menu hambúrguer (reaproveitada de script.js, mas para garantir que funciona aqui)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    hamburgerMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    navList.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });
});