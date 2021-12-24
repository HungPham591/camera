import { useForm } from 'react-hook-form';
import { getUser } from '../../../graphql/user';
import { useQuery } from '@apollo/client';

export default function ListCamera(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { loading, error, data } = useQuery(getUser);
    const onSubmit = (data) => console.log(data);

    const titles = [{ title: 'name', value: 'user_name' }, { title: 'password', value: 'user_pass' }];
    const form = () => {
        return (
            <form className='custom-card form-info' onSubmit={handleSubmit(onSubmit)}>
                {
                    titles.map((value, index) => {
                        const type = (value.value === 'user_pass') ? 'password' : 'text';
                        const enable = index === 0 ? true : false;
                        return (
                            <div key={index}>
                                <p className='label'>{value.title}</p>
                                <input type={type} {...register(value.value, { required: true })} disabled={enable} defaultValue={data?.user[value.value] || ''} />
                                {errors[value.value] && <p>Last name is required.</p>}
                            </div>
                        )
                    })
                }
                <input type="submit" />
            </form>
        )
    }

    return (
        <div>
            <p className='title'>Thông tin tài khoản</p>
            {form()}
        </div>
    )
}
