/**
 * Solid Icons
 */
import {
  faPen,
  faPlus,
  faTrash,
  faTimes,
  faStar as faStarS
} from '@fortawesome/free-solid-svg-icons';

/**
 * Regular Icons
 */
import { faStar, faClock } from '@fortawesome/free-regular-svg-icons';

/**
 * Brand Icons
 */
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTrash, faPlus, faTimes, faPen, faStar, faStarS, faClock, faTrello);
