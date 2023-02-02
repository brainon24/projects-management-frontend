
import './styles/noContent.css';
import { Link as LinkRRD } from 'react-router-dom';

export const NoContent = ({ message = '', icon, messageButton = '', urlRedirect }: any) => {
    return (
        <div className='container-nc'>
            <div>
                <div className='container-icon-nc'>
                    <span className='icon-nc'>
                        { icon }
                    </span>
                </div>
                <p className='paragraph-nc'>
                    { message }
                </p>
                <LinkRRD to={ urlRedirect } className='container-btn-nc'>
                    <button className='btn-nc'>
                        {
                            messageButton
                        }
                    </button>
                </LinkRRD>
            </div>
        </div>
    );
}
